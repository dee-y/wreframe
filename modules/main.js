(function () {
    'use strict';
    function loadHtml(url, dom) {
        var lh = this;
        lh.xhr = new XMLHttpRequest();
        lh.xhr.open("GET", url, true);
        lh.xhr.send();
        lh.xhr.onreadystatechange = function () {
            if (lh.xhr.readyState === XMLHttpRequest.DONE) {
                dom.innerHTML = lh.xhr.responseText;
            }
        };
    }


    function init() {
        var isNewOne=false;
        var nodeList = document.querySelectorAll("div[data-load]");
        nodeList.forEach(function (dom, index) {
            if (dom.hasAttribute('data-load')) {
                isNewOne = true;
                new loadHtml(dom.getAttribute('data-load'), dom);
                dom.removeAttribute('data-load');
            }
        });
        return isNewOne;
    }
    
    function bootStrapApp(){
      init();
      console.log('im bootstrap');
      var chkInterval= setInterval(function(){
          var nodeList = document.querySelectorAll("div[data-load]");
          if(nodeList.length > 0){
                bootStrapApp();
          }else{
              clearInterval(chkInterval);
          }
      },1000);
    };

    bootStrapApp();
})();