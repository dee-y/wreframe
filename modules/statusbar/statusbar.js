/* 
 * Status Bar events goes here
 */

(function (utilityService) {

    'use strict';

    var statusWrapper, statusTxt, sideBar, toggleBtn;
    var domLoaded = false;
    var utyService =utilityService();

    function initStatusBar() {
        var checkLoad = setInterval(function () {
            statusWrapper = document.getElementById("wre-statusbar");
            if(statusWrapper && domLoaded === false){
                domLoaded = true;
                statusTxt = document.querySelector(".status-text");
                toggleBtn = document.getElementById("toggleSideBar");
                toggleBtn.addEventListener('click',toggleSideBar);
                clearInterval(checkLoad);
                registerDOM();
            }
        }, 200);
    };

    function toggleSideBar(){
        if(!sideBar){
            sideBar= document.getElementById('tools');
        }
        sideBar.classList.toggle('hide');
        toggleBtn.classList.toggle('active');
    };

    function registerDOM(){
        utyService.registerDOM(statusTxt,"status");
    };
    
    initStatusBar();

})(utilityService);