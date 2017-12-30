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
                    cornerColor: 'black',
                    cornerSize: 6,
                    transparentCorners: false
                });
        }
        ;
        
        function createObj(obj) {
            var canvasJson=canvas.toJSON();
            var objName=obj.name;
            $http.get('app/data/objects/' + objName + '.json',{cache:true}).then(
                    function (res) {
                        var data=res.data;
                        canvasJson.objects.push(data);
                        objLen.push({value:obj.value});
                        canvas.loadFromJSON(canvasJson,canvas.renderAll.bind(canvas),function(o,object){
                            setCustomDecor(object);
                        });
                    },
                    function (err) {
                        throw err;
                    }
            );
        }
        ;
                
        function deleteObj(){
           var index=canvas.getObjects().indexOf(canvas.getActiveObject())
          canvas.remove(canvas.getActiveObject());
        };
        
        return {
            ccObj:function(json){
                createCustomObject(json);
            },
            intializeCanvas:intializeCanvas,
            createObj:createObj,
            isEdited:isEdited,
            deleteObj:deleteObj,
            objLen:objLen
        };
        
    };
    angular.module('freehand').service('fabricService',['$http',fabricService]);
})();