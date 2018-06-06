(function () {
    'use strict';
    function loadHtml(url, dom) {
        var lh=this;
        lh.xhr = new XMLHttpRequest();
        lh.xhr.open("GET", url, true);
        lh.xhr.send();
        lh.xhr.onreadystatechange = function () {
            if (lh.xhr.readyState === XMLHttpRequest.DONE) {
                dom.innerHTML = lh.xhr.responseText;
            }
        }
    }


    function init() {
        var nodeList = document.querySelectorAll("div");
        nodeList.forEach(function (dom, index) {
            if (dom.hasAttribute('data-load')) {
                new loadHtml(dom.getAttribute('data-load'), dom);
            }
        });
    }
    
    init();
})();