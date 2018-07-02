(function (utilityService) {

    'use strict';

    var domLoad =false;
    var toggleStyle;
    var util = utilityService();

    function init(){
        var chkLoad = setInterval(function(){
            var stylesWin= document.getElementById("stylesWindow");
            if(stylesWin){
                clearInterval(chkLoad);
                domLoad= true;
                toggleStyle= document.getElementById("toggleStyles");
                util.toggle(toggleStyle,'#stylesWindow');
            }
        },1000);
    };

    init();

})(utilityService);