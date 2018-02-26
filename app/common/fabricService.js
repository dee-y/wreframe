/* 
 * Bridge between Fabric and Angular
 */


(function () {
    'use strict';
    function fabricService($http, $timeout, $rootScope, propertyService, canvasProperties) {
        var self = this;

        self.canvas = null;
        self.objLen = [];
        self.isEdited = false;
        self.copiedElement = null;
        self.windowAttr = {};
        self.obj = {show: false, msg: ""};
        self.isZoom = {zoomIn: false, zoomOut: false, default: 1};
        self.canvasMode = {desktop: true, mobile: false};

        self.intializeCanvas = function () {
            self.getWindowProp().then(function (res) {
                angular.copy(res.data, self.windowAttr);
            });
            $timeout(function () {
                var drawArea = document.querySelector(".fh-drawArea");
                var width = parseInt(drawArea.clientWidth);
                width = (width * canvasProperties.desktop.width) / 100;
                var height = drawArea.clientHeight;
                height = (height * canvasProperties.desktop.height) / 100;
                self.canvas = new fabric.Canvas('fhCanvas', {width: width, height: height});
                self.canvas.selection = false;
                self.canvas.backgroundColor = "#fff";
                self.canvas.setZoom(self.isZoom.default);
                for (var cat of self.windowAttr.attr) {
                    if(cat.category && cat.category === "Name & Size"){
                        var prop=cat.prop;
                        for(var property of prop){
                            if(property.name === "Width"){
                                property.value=parseInt(Math.ceil(width))+" px";
                            }
                            if(property.name === "Height"){
                                property.value=parseInt(Math.ceil(height))+" px";
                            }
                        }
                        break;
                    }
                }
                self.canvasEvt();
                self.getPropObj();
            }, 1000);
        };

        self.canvasEvt = function () {
            self.canvas.on("object:selected", function (options) {
                self.objectSelected(options);
            });
            self.canvas.on("object:moving", function (options) {
                self.objMove(options);
            });
            self.canvas.on("selection:cleared", function (options) {
                self.getPropObj();
                self.obj.show = false;
                self.obj.msg = "";
            });
            self.canvas.on("mouse:up", function (evt) {
                self.setZoom(evt);
            });
            document.addEventListener('keydown', self.canvasKey, false);
        };

        self.getWindowProp = function () {
            return $http.get('app/data/properties/window.json', {cache: true});
        };


        self.resizeCanvas = function (viewMode) {
            var drawArea = document.querySelector(".fh-drawArea");
            var width = parseInt(drawArea.clientWidth);
            var height = drawArea.clientHeight;
            self.canvas.clear();
            self.isEdited = false;
            if (viewMode.value === "mobile") {
                width = (width * canvasProperties.mobile.width) / 100;
                height = (height * canvasProperties.mobile.height) / 100;
                self.canvas.setWidth(width);
                self.canvas.setHeight(height);
                self.canvas.setZoom(0.5);
                self.canvasMode.desktop = false;
                self.canvasMode.mobile = true;
            }
            if (viewMode.value === "desktop") {
                width = (width * canvasProperties.desktop.width) / 100;
                height = (height * canvasProperties.desktop.height) / 100;
                self.canvas.setWidth(width);
                self.canvas.setHeight(height);
                self.canvas.setZoom(1);
                self.canvasMode.desktop = true;
                self.canvasMode.mobile = false;
            }
            $timeout(function () {
                $rootScope.$apply();
            }, 100);

        };

        self.setZoom = function (evt) {
            if (self.isZoom.zoomIn === true || self.isZoom.zoomOut === true) {
                var zoom = self.canvas.getZoom();

                if (self.isZoom.zoomIn === true) {
                    zoom += 0.1;
                }
                if (self.isZoom.zoomOut === true) {
                    zoom -= 0.1;
                }
                var zoomLevel = (zoom * 100) / (self.isZoom.default * 100);
                zoomLevel *= 100;
                self.obj.show = true;
                self.obj.msg = "Zoom : " + parseInt(zoomLevel) + "%";
                self.canvas.setZoom(zoom);
                $rootScope.$apply();
            }
        };

        self.canvasKey = function (e) {
            //Delete Obj if Delete key is pressed
            if (e.code === "Delete") {
                self.deleteObj();
            }

            if (e.code === "KeyC" && e.ctrlKey === true) {
                self.copyObj();
            }

            if (e.code === "KeyV" && e.ctrlKey === true) {
                e.preventDefault();
                self.pasteObj();
            }
        };

        self.objMove = function (options) {
            var top = parseInt(options.target.top);
            var left = parseInt(options.target.left);
            self.obj.msg = "X: " + left + " Y: " + top;
            var prop = self.canvas.getActiveObject().properties;
            for (var cat of prop) {
                if (cat.category === 'Fill') {
                    for (var item of cat.prop) {
                        if (item.name === "Pos X") {
                            item.value = left;
                        }
                        if (item.name === "Pos Y") {
                            item.value = top;
                        }
                    }
                }
            }
            $rootScope.$apply();
        };

        self.copyObj = function () {
            self.canvas.getActiveObject().clone(function (cloned) {
                self.copiedElement = cloned;
                var activeObj = self.canvas.getActiveObject();
                var customId = activeObj.customId;
                var customName = activeObj.customName;
                cloned.customId = customId;
                cloned.customName = customName;
                cloned.properties = activeObj.properties;
            });
        };

        self.pasteObj = function () {
            self.copiedElement.clone(function (obj) {
                self.canvas.discardActiveObject();
                obj.set({
                    left: obj.left + 10,
                    top: obj.top + 10,
                    evented: true,
                    customId: self.copiedElement.customId,
                    customName: self.copiedElement.customName,
                    properties: self.copiedElement.properties
                });
                self.canvas.add(obj);
                self.copiedElement.top += 10;
                self.copiedElement.left += 10;
                self.setCustomDecor(obj);
            });
        }
        ;

        self.zoomEnabled = function (val) {
            self.deactiveAll();
            if (val === "zoomin") {
                self.canvas.defaultCursor = "zoom-in";
                self.isZoom.zoomIn = true;
                self.isZoom.zoomOut = false;
            } else {
                self.canvas.defaultCursor = 'zoom-out';
                self.isZoom.zoomIn = false;
                self.isZoom.zoomOut = true;
            }
            self.canvas.renderAll.bind(self.canvas);
        };

        self.zoomDisabled = function () {
            self.canvas.defaultCursor = "default";
            self.isZoom.zoomIn = false;
            self.isZoom.zoomOut = false;
            self.obj.show = false;
            var objects = self.canvas.getObjects();
            if (objects.length > 0) {
                objects.forEach(function (item, index) {
                    item.selectable = true;
                });
            }
        };

        self.deactiveAll = function () {
            var objects = self.canvas.getObjects();
            if (objects.length > 0) {
                objects.forEach(function (item, index) {
                    item.selectable = false;
                });
            }
        };

        self.getImgData = function () {
            var pngData = self.canvas.toDataURL('png');
            return pngData;
        };

        self.getJSONData = function () {
            return JSON.stringify(self.canvas);
        };

        self.getFileName = function () {
            var attrs = self.windowAttr.attr[0];
            for (var property of attrs.prop) {
                if (property.name === "Name") {
                    return property.value;
                }
            }
        };

        self.genProperty = function () {
            var mode = (self.canvasMode.desktop === true) ? "desktop" : "mobile";
            var obj = {"window": mode, "objects": []};
            var canvasObj = self.canvas.getObjects();
            canvasObj.forEach(function (ob, index) {
                var object = {};
                object.customId = ob.customId;
                object.customName = ob.customName;
                object.properties = ob.properties;
                obj.objects.push(object);
            });
            return JSON.stringify(obj);
        };

        self.objectSelected = function (options) {
            if (options.target.customId === "tab") {
                self.canvas.forEachObject(function (obj) {
                    if (obj === options.target)
                        return;
                    obj.bringToFront();
                });
            }
            self.obj.show = true;
            self.obj.msg = "X: " + parseInt(options.target.left) + " Y: " + parseInt(options.target.top);
            self.getPropObj();
        };


        self.setCustomDecor = function (obj) {
            obj.setControlVisible('mtr', false);
            obj.set({
                borderColor: 'grey',
                cornerColor: '#fff',
                cornerStrokeColor: "#000",
                padding: 4,
                cornerSize: 8,
                cornerStyle: "circle",
                transparentCorners: false
            });
        };

        self.setProperties = function (obj, canvasObj) {
            canvasObj.customName = obj.value;
            canvasObj.customId = obj.name;
            canvasObj.properties = [];
            $http.get('app/data/properties/' + obj.name + '.json', {cache: true}).then(
                    function (res) {
                        if (res.data.attr) {
                            angular.copy(res.data.attr, canvasObj.properties);
                        }
                    },
                    function (err) {}
            );
            return canvasObj;
        };

        self.getPropObj = function () {
            var prop = {name: "Window", value: "window"};
            var objProp = {};
            if (self.canvas.getActiveObject()) {
                var obj = self.canvas.getActiveObject();
                prop.name = obj.customName;
                prop.value = obj.customId;
                objProp.name = obj.customName;
                objProp.attr = obj.properties;
            } else {
                objProp = self.windowAttr;
            }
            propertyService.setProperties(prop, objProp);
            return prop;
        };

        self.getCurrentObj = function () {
            if(self.canvas.getActiveObject()){
                return self.canvas.getActiveObject();
            }else{
                return false;
            }
        };

        self.createObj = function (obj) {
            var objName = obj.name;
            $http.get('app/data/objects/' + objName + '.json', {cache: true}).then(
                    function (res) {
                        var data = res.data;
                        var objType = fabric.util.getKlass(data.type);
                        if (objType.async) {
                            objType.fromObject(data, function (ele) {
                                var finalObj = self.setProperties(obj, ele);
                                self.canvas.add(finalObj);
                            });
                        } else {
                            var finalObj = self.setProperties(obj, data);
                            self.canvas.add(objType.fromObject(finalObj));
                        }
                        $timeout(function () {
                            self.objLen.push({value: obj.value});
                            self.setCustomDecor(self.canvas.item(self.canvas.getObjects().length - 1));
                        }, 100);
                    },
                    function (err) {
                        throw err;
                    }
            );
        };

        self.deleteObj = function () {
            while (self.objLen.length > 0) {
                self.objLen.pop();
            }
            self.canvas.remove(self.canvas.getActiveObject());
            var objects = self.canvas.getObjects();
            for (var ele of objects) {
                self.objLen.push({value: ele.customName});
            }
        };
        
        self.setObjProp = function (obj, mapIndex) {
            var activeObj = self.canvas.getActiveObject();
            var objects = activeObj.getObjects();
            if (Array.isArray(mapIndex) === true) {
                for (var item of mapIndex) {
                    objects[item].set(obj.type, obj.value);
                }
            } else {
                objects[mapIndex].set(obj.type, obj.value);
            }
            self.canvas.renderAll();
        };

        self.setBorderColor =function(value,mapIndex){
            var activeObj = self.canvas.getActiveObject();
            if (activeObj) {
                var obj={type:'stroke',value:value};
                self.setObjProp(obj,mapIndex);
            } else {
                if (self.windowAttr) {
                    self.windowAttr.attr[0].value = value;
                }
            }
        };

        self.setText = function (value, mapIndex) {
            var activeObj = self.canvas.getActiveObject();
            if (activeObj) {
                var obj={type:'text',value:value};
                self.setObjProp(obj,mapIndex);
                var prop = activeObj.properties;
                prop.forEach(function (attr, index) {
                    if (attr.name === "Text" && attr.type === "text") {
                        attr.value = value;
                    }
                });
            } else {
                if (self.windowAttr) {
                    self.windowAttr.attr[0].value = value;
                }
            }
        };


        self.setBorderWidth = function (value, mapIndex) {
            var activeObj = self.canvas.getActiveObject();
            if (activeObj) {
                var obj={type:'strokeWidth',value:value};
                self.setObjProp(obj,mapIndex);
                var prop = activeObj.properties;

                prop.forEach(function (attr, index) {
                    if (attr.name === "Border Width" && attr.type === "number") {
                        attr.value = value;
                    }
                });
            }
        };

        self.setBkgColor = function (value, mapIndex) {
            var activeObj = self.canvas.getActiveObject();
            var prop = {};
            if (activeObj) {
                var obj={type:'fill',value:value};
                self.setObjProp(obj,mapIndex);
                self.canvas.renderAll.bind(self.canvas);
                prop = activeObj.properties;
            } else {
                self.canvas.setBackgroundColor(value, self.canvas.renderAll.bind(self.canvas));
                prop = self.windowAttr.attr;
            }
            for (var cat of prop) {
                if (cat.category === 'Fill') {
                    for (var item of cat.prop) {
                        if (item.name === "Background") {
                            item.value = value;
                        }
                    }
                }
            }
            $timeout(function(){
                $rootScope.$apply();
            },100);
        };

        self.loadFile = function (objJSON, propJSON) {
            self.canvas.clear();
            var inc = 0;
            var prop = propJSON.objects;
            var viewMode = propJSON.window;
            self.resizeCanvas({value: viewMode});
            self.canvas.loadFromJSON(objJSON, function () {
                self.canvas.renderAll();
            }, function (o, object) {
                object.customId = prop[inc].customId;
                object.customName = prop[inc].customName;
                object.properties = prop[inc].properties;
                inc++;  
                self.setCustomDecor(object);
            });
        };

    }
    ;
    angular.module('freehand').service('fabricService', ['$http', '$timeout', '$rootScope', 'propertyService', 'canvasProperties', fabricService]);
})();