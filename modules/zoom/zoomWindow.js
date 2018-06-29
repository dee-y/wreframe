(function(){
    
    'use strict';
    
    var drawArea;
    var zoomRange,zoomTxt;
    
    var init = function(){
        var domLoaded = setInterval(function(){
            var zoomWindow = document.getElementById("zoomWindow");
            if(zoomWindow){
                clearInterval(domLoaded);
                zoomRange = document.getElementById("zoomRange");
                zoomTxt = document.getElementById("zoomTxt");
                zoomRange.addEventListener("input",setZoom);
            }
        },100);
    };


    function setZoom(evt){
        if(!drawArea){
            drawArea = document.getElementById("drawArea");
        }
        if(zoomTxt){
            var zoomVal=zoomRange.value + '%';
            zoomTxt.innerHTML = zoomVal;
            drawArea.style.zoom= zoomVal;
        }
    };

    init();
    
})();