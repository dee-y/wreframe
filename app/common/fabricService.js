/* 
 * Bridge between Fabric and Angular
 */


(function () {
    'use strict';

    function fabricService($http, $timeout,$rootScope, propertyService) {
        var self = this;

        self.canvas = null;
        self.objLen = [];
        self.isEdited = false;
        self.copiedElement = null;
        self.windowAttr = {};
        self.obj={moving:false,x:0,y:0};

        self.intializeCanvas = function () {
            self.getWindowProp().then(function (res) {
                angular.copy(res.data, self.windowAttr);
            });
            $timeout(function () {
                var drawArea = document.querySelector(".fh-drawArea");
                var width = parseInt(drawArea.clientWidth);
                width=(width * 85)/100;
                var height = drawArea.clientHeight;
                height=(height * 85) /100;
                self.canvas = new fabric.Canvas('fhCanvas', {width: width, height: height});
                self.canvas.selection = false;
                self.canvas.backgroundColor = "#fff";
                self.canvas.setZoom(0.8);
                self.canvas.on("object:selected", function (options) {
                    self.objectSelected(options);
                });
                self.canvas.on("object:moving", function (options) {
                    self.obj.x = parseInt(options.target.left);
                    self.obj.y = parseInt(options.target.top);
                    $rootScope.$apply();
                });
                self.canvas.on("selection:cleared", function (options) {
                    self.getPropObj();
                    self.obj.moving = false;
                    self.obj.x = 0;
                    self.obj.y = 0;
                });
                self.getPropObj();
                document.addEventListener('keydown', self.canvasKey, false);
            }, 1000);
        };

        self.getWindowProp = function () {
            return $http.get('app/data/properties/window.json', {cache: true});
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

        self.pasteObj = function() {
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

        self.getImgData = function () {
            var pngData = self.canvas.toDataURL('png');
            return pngData;
        }

        self.getJSONData = function () {
            return JSON.stringify(self.canvas);
        };
        
        self.genProperty = function (){
          var obj={"objects":[]}  ;
          var canvasObj=self.canvas.getObjects();
          canvasObj.forEach(function(ob,index){
             var object={};
             object.customId=ob.customId;
             object.customName=ob.customName;
             object.properties=ob.properties;
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
            self.obj.moving = true;
            self.obj.x=parseInt(options.target.left);
            self.obj.y=parseInt(options.target.top);
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
                            var attrs = res.data.attr;
                            attrs.forEach(function (item, index) {
                                canvasObj.properties.push(item);
                            });
                        }
                    },
                    function (err) {

                    }
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
                objProp.name=obj.customId;
                objProp.attr =obj.properties;
            } else {
                objProp = self.windowAttr;
            }
            propertyService.setProperties(prop, objProp);
            return prop;
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
                            var finalObj = setProperties(obj, data);
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
        
        self.deleteObj =function(){
          while(self.objLen.length > 0){
              self.objLen.pop();
          }
          self.canvas.remove(self.canvas.getActiveObject());
          var objects=self.canvas.getObjects();
          for(var ele of objects){
              self.objLen.push({value:ele.customName});
          }
        };
        
        self.setText = function(value) {
            var activeObj = self.canvas.getActiveObject();
            if (activeObj) {
                var objects = activeObj.getObjects();
                var prop = activeObj.properties;
                var isFound = false;
                objects.forEach(function (obj, index) {
                    if (obj.type === "text" && isFound === false) {
                        obj.setText(value);
                        self.canvas.renderAll();
                        isFound = true;
                    }
                });

                prop.forEach(function (attr, index) {
                    if (attr.name === "Text" && attr.type === "text") {
                        attr.value = value;
                    }
                });
            }else{
                if(self.windowAttr){
                    self.windowAttr.attr[0].value=value;
                }
            }
        };
        
        self.setBkgColor = function (value) {
            var isFound = false;
            var activeObj = self.canvas.getActiveObject();
            if (activeObj) {
                var objects = activeObj.getObjects();
                objects.forEach(function (item, index) {
                    if (item.type === "rect" && isFound === false) {
                        item.set("fill", value);
                        item.set("background", value);
                        isFound = true;
                    }
                });
                for (var prop of activeObj.properties) {
                    if (prop.name === 'Background') {
                        prop.value = value;
                    }
                }
            } else {
                self.canvas.setBackgroundColor(value, self.canvas.renderAll.bind(self.canvas));
                for (var item of self.windowAttr.attr) {
                    if (item.name === 'Background') {
                        item.value = value;
                    }
                }
            }
            $rootScope.$apply();
        };
        
        self.loadFile = function (objJSON,propJSON) {
            self.windowAttr.attr[1].value=objJSON.background;
            self.canvas.clear();
            var inc=0;
            var prop=propJSON.objects;
            self.canvas.loadFromJSON(objJSON, function () {
                self.canvas.renderAll();
            }, function (o, object) {
                object.customId=prop[inc].customId;
                object.customName=prop[inc].customName;
                object.properties=prop[inc].properties;
                inc++;
                self.setCustomDecor(object);
            });
        };

    }
    ;
    angular.module('freehand').service('fabricService', ['$http', '$timeout','$rootScope', 'propertyService', fabricService]);
})();