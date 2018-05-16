/* 
 * Draw Resize Module
 */

(function(){
    'use strict';
    
    var mainArea=document.getElementById("mainArea");
    
    function init(){
        mainArea.classList.add("resize");
    }
    
    
    if(mainArea){
        init();
    }
    
})();

