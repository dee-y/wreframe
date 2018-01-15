/* 
 * Bridge between Fabric and Angular
 */


(function () {
    'use strict';

    function fabricService($http, $timeout, propertyService) {
        var self = this;

        self.canvas = null;
        self.objLen = [];
        self.isEdited = false;
        self.copiedElement = null;
        self.windowAttr = null;

        self.intializeCanvas = function () {
            self.getWindowProp().then(function (res) {
                angular.copy(res.data, self.windowAttr);
            });
            $timeout(function () {
                var drawArea = document.querySelector(".fh-drawArea");
                var width = parseInt(drawArea.clientWidth);
                var height = drawArea.clientHeight - 10;
                self.canvas = new fabric.Canvas('fhCanvas', {width: width, height: height});
                self.canvas.selection = false;
                self.canvas.backgroundColor = new fabric.Pattern({source: 'img/draw/desktop-bkg.png'}, self.canvas.renderAll.bind(self.canvas));
                self.canvas.on("object:selected", function (options) {
                    self.objectSelected(options);
                });
                self.canvas.on("selection:cleared", self.getPropObj);
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

        function pasteObj() {
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
            self.canvas.backgroundColor = null;
            var pngData = self.canvas.toDataURL('png')
            self.canvas.backgroundColor = new fabric.Pattern({source: 'img/draw/desktop-bkg.png'}, self.canvas.renderAll.bind(self.canvas))
            return pngData;
        }

        self.getJSONData = function () {
            return JSON.stringify(self.canvas);
        }

        self.objectSelected = function (options) {
            if (options.target.customId === "tab") {
                self.canvas.forEachObject(function (obj) {
                    if (obj === options.target)
                        return;
                    obj.bringToFront();
                });
            }
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
            var properties = [];
            if (self.canvas.getActiveObject()) {
                var obj = self.canvas.getActiveObject();
                prop.name = obj.customName;
                prop.value = obj.customId;
                properties = obj.properties;
            } else {
                properties = self.windowAttr;
            }
            propertyService.setProperties(prop, properties);
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
                objects.forEach(function (obj, index) {
                    if (obj.type === "text") {
                        obj.setText(value);
                        self.canvas.renderAll();
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
        }
        ;

    }
    ;
    angular.module('freehand').service('fabricService', ['$http', '$timeout', 'propertyService', fabricService]);
})();