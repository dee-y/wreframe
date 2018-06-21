/* 
 * Shapes Functionality Goes Here
 */

(function (drawShapes) {

    'use strict';

    var ds = drawShapes;
    var drawArea,shapesWrapper,rectBtn,circleBtn;

    function init() {
        var chkInterval = setInterval(function () {
            drawArea = document.getElementById("drawArea");
            if (drawArea) {
                shapesWrapper= document.getElementById("shapesWrapper");
                clearInterval(chkInterval);
                setListeners();
            }
        }, 1000);
    }
    
    
    function setListeners(){
        rectBtn=document.querySelector('div[data-shape ="rect"]');
        circleBtn=document.querySelector('div[data-shape ="circle"]');
        if(rectBtn){
            rectBtn.addEventListener('click', function(){
                ds.drawShape(shapesWrapper,'rect');
            });
        }
        if(circleBtn){
            circleBtn.addEventListener('click', function(){
                ds.drawShape(shapesWrapper,'circle');
            });
        }
    }
    
    init();

})(drawShapes);
