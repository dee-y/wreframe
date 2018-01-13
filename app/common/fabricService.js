/* 
 * Bridge between Fabric and Angular
 */


(function(){
    'use strict';
    
    function fabricService($http,propertyService){
        
        var canvas=null;
        var objLen=[];
        var isEdited=false;
        var copiedElement=null;
        
        function intializeCanvas() {
            setTimeout(function () {
                var drawArea = document.querySelector(".fh-drawArea");
                var width = parseInt(drawArea.clientWidth);
                var height = drawArea.clientHeight - 10;
                canvas = new fabric.Canvas('fhCanvas', {width: width, height: height});
                canvas.selection=false;
                canvas.backgroundColor = new fabric.Pattern({source: 'img/draw/desktop-bkg.png'},canvas.renderAll.bind(canvas))
                canvas.on("object:selected", function (options) { objectSelected(options)});
                canvas.on("selection:cleared",getPropObj);
                getPropObj();
                
                document.addEventListener('keydown',canvasKey,false);
            }, 1000);
        } ;
        
        function canvasKey(e){
            //Delete Obj if Delete key is pressed
            if(e.code === "Delete"){deleteObj();}
            
            if(e.code === "KeyC" && e.ctrlKey === true){copyObj();}
            
            if(e.code === "KeyV" && e.ctrlKey === true){
                e.preventDefault();
                pasteObj();
            }
        };
        
        function copyObj() {
            canvas.getActiveObject().clone(function (cloned) {
                copiedElement = cloned;
                var activeObj=canvas.getActiveObject();
                var customId=activeObj.customId;
                var customName=activeObj.customName;
                cloned.customId=customId;
                cloned.customName=customName;
                cloned.properties=activeObj.properties;
            });
        }
        ;
        
        function pasteObj() {
            copiedElement.clone(function (obj) {
                canvas.discardActiveObject();
                obj.set({
                    left: obj.left + 10,
                    top: obj.top + 10,
                    evented: true,
                    customId:copiedElement.customId,
                    customName:copiedElement.customName,
                    properties:copiedElement.properties
                });
                canvas.add(obj);
                copiedElement.top += 10;
                copiedElement.left += 10;
                setCustomDecor(obj);
            });
        };
        
        function getImgData(){
            canvas.backgroundColor = null;
            var pngData=canvas.toDataURL('png')
            canvas.backgroundColor = new fabric.Pattern({source: 'img/draw/desktop-bkg.png'},canvas.renderAll.bind(canvas))
            return pngData;
        }
        
        function getJSONData(){
            return JSON.stringify(canvas);
        }
        
        function objectSelected(options){
            if(options.target.customId === "tab"){
                canvas.forEachObject(function(obj){
                    if (obj === options.target) return;
                    obj.bringToFront();
                });
            }
            getPropObj();
        };
        
        
        function setCustomDecor(obj) {
                obj.setControlVisible('mtr', false);
                obj.set({
                    borderColor: 'grey',
                    cornerColor: '#fff',
                    cornerStrokeColor:"#000",
                    padding: 4,
                    cornerSize: 8,
                    cornerStyle:"circle",
                    transparentCorners: false
                });
        };
        
        
        function setProperties(obj,canvasObj){
            canvasObj.customName=obj.value;
            canvasObj.customId=obj.name;
            canvasObj.properties=[];
            $http.get('app/data/properties/' + obj.name + '.json', {cache: true}).then(
                    function (res) {
                        if(res.data.attr){
                            var attrs=res.data.attr;
                            attrs.forEach(function(item,index){
                                canvasObj.properties.push(item);
                            });
                        }
                    },
                    function (err) {

                    }
            );
            return canvasObj;
        }
        
        function getPropObj(){
            var prop={name:"Window",value:"window"};
            var windowAttr=[ {"name":"Text","value":"Untitled View","type":"text"},{"name":"Background","value":"Transparent","type":"color"},{"name":"Home Page","value":true,"type":"boolean"}];
            var properties=[];
            if(canvas.getActiveObject()){
                var obj=canvas.getActiveObject();
                prop.name=obj.customName;
                prop.value=obj.customId;
                properties=obj.properties;
            }else{
                properties=windowAttr;
            }
            propertyService.setProperties(prop,properties);
            return prop;
        };
        
        function createObj(obj) {
            var objName = obj.name;
            $http.get('app/data/objects/' + objName + '.json', {cache: true}).then(
                    function (res) {
                        var data = res.data;
                        var objType = fabric.util.getKlass(data.type);
                        if (objType.async) {
                            objType.fromObject(data, function (ele) {
                                var finalObj=setProperties(obj,ele);
                                canvas.add(finalObj);
                            });
                        } else {
                            var finalObj=setProperties(obj,data);
                            canvas.add(objType.fromObject(finalObj));
                        }
                        setTimeout(function(){
                            objLen.push({value:obj.value});
                            setCustomDecor(canvas.item(canvas.getObjects().length - 1));
                        },100);
                    },
                    function (err) {
                        throw err;
                    }
            );
        }
        ;
                
        function deleteObj(){
          while(objLen.length > 0){
              objLen.pop();
          }
          canvas.remove(canvas.getActiveObject());
          var objects=canvas.getObjects();
          for(var ele of objects){
              objLen.push({value:ele.customName});
          }
        };
        
        function setText(value){
            var activeObj=canvas.getActiveObject();
            var objects=activeObj.getObjects();
            var prop=activeObj.properties;
            objects.forEach(function(obj,index){
               if(obj.type === "text") {
                   obj.setText(value);
                   canvas.renderAll();
               }
            });
            
            prop.forEach(function(attr,index){
               if(attr.name === "Text" && attr.type === "text") {
                   attr.value=value;
               }
            });
        };
        
        return {
            ccObj:function(json){
                createCustomObject(json);
            },
            intializeCanvas:intializeCanvas,
            createObj:createObj,
            isEdited:isEdited,
            deleteObj:deleteObj,
            objLen:objLen,
            getPropObj:getPropObj,
            setText:setText,
            getImgData:getImgData,
            getJSONData:getJSONData
        };
        
    };
    angular.module('freehand').service('fabricService',['$http','propertyService',fabricService]);
})();