(function(utilityService,authEvent){
    
    'use strict';
    
    var drawArea;
    var zoomRange,zoomTxt,toggleCnt;
    var util=utilityService();
    var auth=new authEvent();
    var evt={event: "zoom",errMsg:"Reset Zoom to 100%"};
    
    var init = function(){
        var domLoaded = setInterval(function(){
            var zoomWindow = document.getElementById("zoomWindow");
            if(zoomWindow){
                clearInterval(domLoaded);
                zoomRange = document.getElementById("zoomRange");
                zoomTxt = document.getElementById("zoomTxt");
                zoomRange.addEventListener("input",setZoom);
                toggleCnt = document.getElementById("toggleZoom");
                util.toggle(toggleCnt,"#zoomWindow");
                console.log("Registering Event Zoom Func");
                auth.registerEvent(evt);
            }
        },100);
    };


    function setZoom(e){
        auth.activateEvent(evt);
        if(!drawArea){
            drawArea = document.getElementById("drawArea");
        }
        if(zoomTxt){
            var zoomVal=zoomRange.value + '%';
            zoomTxt.innerHTML = zoomVal;
            drawArea.style.zoom= zoomVal;
        }

        if(parseInt(zoomRange.value) === 100){
            auth.deactivateEvent(evt,function(){});
        }
    };

    init();
    
})(utilityService,authEvent);