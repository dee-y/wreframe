/* 
 * Bridge between Fabric and Angular
 */


(function(){
    'use strict';
    
    function fabricService(){
        
        var canvas=null;
        var objLen=[];
        var isEdited=false;
        
        function intializeCanvas() {
            setTimeout(function () {
                var drawArea = document.querySelector(".fh-drawArea");
                var width = parseInt(drawArea.clientWidth);
                var height = drawArea.clientHeight - 80;

                canvas = new fabric.Canvas('fhCanvas', {width: width, height: height});
                canvas.on("object:selected", function (options) {
                    options.target.bringToFront();
                });
            }, 1000);
        } ;
        
        
        function setCustomDecor() {
            var lastItemIndex = getObject().length - 1;
            canvas.item(lastItemIndex).setControlVisible('mtr', false);
            canvas.item(lastItemIndex).set({
                borderColor: 'grey',
                cornerColor: 'black',
                cornerSize: 6,
                transparentCorners: false
            });
        };
        
        function createIMH(){
            var rect = createRect({left: 200,top: 250,fill: '#ccc',width: 150,height: 150});
            var text = new fabric.Text("IMAGE", {left: 240, top: 310,fontSize:18});
            var group = new fabric.Group([rect,text], {
                left: 150,
                top: 100
            });
            
            objLen.push({value:"Image"});
            canvas.add(group);
            setCustomDecor();
        };
        
        function createAvatar() {
            fabric.Image.fromURL('img/draw/avatar.svg', function (oImg) {
                oImg.setLeft(0);
                oImg.setTop(0);
                canvas.add(oImg);
                objLen.push({value:"Avatar"});
                canvas.renderAll();
                setCustomDecor();
            });
        };
        
        function createTxtBox(){
           var rect = createRect({left: 100,top: 100,fill:'transparent',stroke: '#ccc',width: 150,height: 25});
            var text = new fabric.Text("text", {left: 140, top: 105,fontSize:18});
            var group = new fabric.Group([rect,text], {
                left: 150,
                top: 100
            });

            canvas.add(group);
            setCustomDecor();
            objLen.push({value:"Text Box"});
        };
        
        function createContentTxt(){
            var rect = createRect({left: 200,top: 250,strokeWidth:0,fill: '#ccc',width: 200,height: 10});
            var rect1 = createRect({left: 200,top: 265,strokeWidth:0,fill: '#ccc',width: 200,height: 10});
            var rect2 = createRect({left: 200,top: 280,strokeWidth:0,fill: '#ccc',width: 200,height: 10});
            var rect3 = createRect({left: 200,top: 295,strokeWidth:0,fill: '#ccc',width: 200,height: 10});
            var rect4 = createRect({left: 200,top: 310,strokeWidth:0,fill: '#ccc',width: 200,height: 10});
            var group = new fabric.Group([rect,rect1,rect2,rect3,rect4], {
                left: 150,
                top: 100
            });

            canvas.add(group);
            setCustomDecor();
            objLen.push({value:"Text (Multiline)"});
        };
        
        function createPopup(){
            var rect = createRect({left: 200,top: 250,fill: 'white',width: 200,height: 130});
            var rect1 = createRect({left: 200,top: 250,fill: '#ccc',width: 200,height: 30});
            createGroup([rect,rect1]);
            objLen.push({value:"Pop-up"});
        };
        
        function createBtn() {
            var rect = createRect({left: 100,top: 100,fill: 'white',width: 100,height: 30});
            var btnText='Button';
            var text = new fabric.Text(btnText, {left: 130, top: 108,fontSize:13});
            createGroup([rect,text]);
            objLen.push({value:"Button"});
        };
        
        
        function createDummyTxt(){
            var txtString='Lorem ipsum dolor sit amet, consectetur adipiscing elit';
            var text = new fabric.Text(txtString, {left: 130, top: 108,fontSize:13});
            canvas.add(text);
            setCustomDecor();
            objLen.push({value:"Text (Single Line / label)"});
        };
        
        function deleteObj(){
           var index=canvas.getObjects().indexOf(canvas.getActiveObject())
           console.log(index);
          canvas.remove(canvas.getActiveObject());
        };
        
        /* Utility Functions */
        
        function createRect(json){
          var rect = new fabric.Rect(json);  
          return rect;
        };
        
        function getObject(){
          var items={};
          items=canvas.toObject().objects;
          return items;
        };
        
        function createGroup(elements){
            var group = new fabric.Group(elements, {
                left: 150,
                top: 100,
                stroke: 'black',
                strokeWidth:1,
            });
            
            canvas.add(group);
            setCustomDecor();
        };
        
        return {
            ccObj:function(json){
                createCustomObject(json);
            },
            intializeCanvas:intializeCanvas,
            createBtn:createBtn,
            createPopup:createPopup,
            createIMH:createIMH,
            createDummyTxt:createDummyTxt,
            createContentTxt:createContentTxt,
            createAvatar:createAvatar,
            createTxtBox:createTxtBox,
            isEdited:isEdited,
            deleteObj:deleteObj,
            objLen:objLen
        };
        
    };
    
    angular.module('freehand').service('fabricService',[fabricService]);
    
})();