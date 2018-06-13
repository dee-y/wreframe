/* 
 * Shapes Functionality Goes Here
 */

(function (drawShapes) {

    'use strict';

    var ds = drawShapes;

    var drawAreaLoaded = false;
    var drawArea,shapesWrapper,rectBtn;

    function init() {
        var chkInterval = setInterval(function () {
            drawArea = document.getElementById("drawArea");
            if (drawArea) {
                shapesWrapper= document.getElementById("shapesWrapper");
                clearInterval(chkInterval);
                drawAreaLoaded = true;
                setListeners();
            }
        }, 1000);

    }
    
    
    function setListeners(){
        rectBtn=document.querySelector('div[data-shape ="rect"]');
        if(rectBtn){
            rectBtn.addEventListener('click',drawRect);
        }
    }
    
    
    function  drawRect(){
        ds.drawRect(shapesWrapper);
    };
    
    function drawCircle(){
        
    };
    
    init();

})(drawShapes);
