/* 
 * Status Bar events goes here
 */

(function (utilityService) {

    'use strict';

    var statusWrapper, statusTxt;
    var domLoaded = false;
    var utyService =utilityService();

    function initStatusBar() {
        var checkLoad = setInterval(function () {
            statusWrapper = document.getElementById("wre-statusbar");
            if(statusWrapper && domLoaded === false){
                domLoaded = true;
                statusTxt = document.querySelector(".status-text");
                clearInterval(checkLoad);
                registerDOM();
            }
        }, 200);
    };
    
    function registerDOM(){
        utyService.registerDOM(statusTxt,"status");
    }
    
    initStatusBar();

})(utilityService);