/*
 * Draw Resize Module
 */

(function (evtService,utilityService) {
    'use strict';

    var resizePercent = 0.85;
    var mainArea, drawArea;
    var utlService = utilityService();

    function init() {
        var isDocLoaded = setInterval(function () {
            mainArea = document.getElementById('mainArea');
            drawArea = document.getElementById('drawArea');
            if (drawArea) {
                clearInterval(isDocLoaded);
                setDrawArea();
            }
        }, 1000);
    };
    
    
    function showStatus(evt){
        utlService.showStatus(evt);
    };


    function setDrawArea() {
        var maxWidth = window.screen.availWidth;
        var maxHeight = window.screen.availHeight;
        drawArea.style.width = mainArea.style.width = (maxWidth * resizePercent) + 'px';
        drawArea.style.height = mainArea.style.height = (maxHeight * resizePercent) + 'px';
        evtService.windowResizer(drawArea,showStatus);
        evtService.windowSelector(drawArea,showStatus);
    }
    init();

})(evtService,utilityService);
