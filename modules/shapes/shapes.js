/* 
 * Shapes Functionality Goes Here
 */

(function (drawShapes,authEvent) {

    'use strict';

    var ds = drawShapes;
    var drawArea,shapesWrapper,rectBtn,circleBtn;
    var authEvent=new authEvent();

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

    function authActions(evt,type){
        var result =authEvent.activateEvent(evt);
        if(result === true){
            ds.drawShape(shapesWrapper,type);
        }
    }
    
    
    function setListeners(){
        rectBtn=document.querySelector('div[data-shape ="rect"]');
        circleBtn=document.querySelector('div[data-shape ="circle"]');
        if(rectBtn){
            authEvent.registerEvent({event:'drawRect'});
            rectBtn.addEventListener('click', function(){
                authActions({event:'drawRect'},'rect');
            });
        }
        if(circleBtn){
            authEvent.registerEvent({event:'drawCircle'});
            circleBtn.addEventListener('click', function(){
                authActions({event:'drawCircle'},'circle');
            });
        }
    }

    init();

})(drawShapes,authEvent);
