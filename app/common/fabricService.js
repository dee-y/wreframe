/* 
 * Bridge between Fabric and Angular
 */


(function(){
    'use strict';
    
    function fabricService($http){
        
        var canvas=null;
        var objLen=[];
        var isEdited=false;
        
        function intializeCanvas() {
            setTimeout(function () {
                var drawArea = document.querySelector(".fh-drawArea");
                var width = parseInt(drawArea.clientWidth);
                var height = drawArea.clientHeight - 20;
                canvas = new fabric.Canvas('fhCanvas', {width: width, height: height});
                canvas.on("object:selected", function (options) {
                    options.target.bringToFront();
                });
            }, 1000);
        } ;
        
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
        
        function getPropObj(){
            var setProp={name:"Window",value:"window"};
            if(canvas.getActiveObject()){
                var obj=canvas.getActiveObject();
                setProp.name=obj.customName;
                setProp.value=obj.customId;
            }
            return setProp;
        };
        
        function createObj(obj) {
            var objName = obj.name;
            var objValue= obj.value;
            $http.get('app/data/objects/' + objName + '.json', {cache: true}).then(
                    function (res) {
                        var data = res.data;
                        var objType = fabric.util.getKlass(data.type);
                        if (objType.async) {
                            objType.fromObject(data, function (finalObj) {
                                finalObj.customName=objValue;
                                finalObj.customId=objName;
                                canvas.add(finalObj);
                            });
                        } else {
                            data.customName=objValue;
                            data.customId=objName;
                            canvas.add(objType.fromObject(data));
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
        
        return {
            ccObj:function(json){
                createCustomObject(json);
            },
            intializeCanvas:intializeCanvas,
            createObj:createObj,
            isEdited:isEdited,
            deleteObj:deleteObj,
            objLen:objLen,
            getPropObj,getPropObj
        };
        
    };
    angular.module('freehand').service('fabricService',['$http',fabricService]);
})();