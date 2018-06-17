(function () {

    'use strict';

    var eleSelector;
    var eleActive = false;
    var elePaddingLeft, elePaddingTop;

    function init() {
        var chkInterval = setInterval(function () {
            eleSelector = document.getElementById('eleSelector');
            if (eleSelector) {
                clearInterval(chkInterval);
                setListeners();
            }
        }, 1000);
    }
    ;


    function setListeners() {
        eleSelector.addEventListener('mousedown', function (e) {
            eleActive = true;
        });
        eleSelector.addEventListener('mouseup', function (e) {
            eleActive = false;
        });
        eleSelector.addEventListener('mousemove', moveObj);
    };

    function moveObj(e) {
        if(e.buttons === 0){
            eleActive = false;
        }
        if (eleActive === true) {
            elePaddingLeft = eleSelector.offsetLeft;
            elePaddingTop = eleSelector.offsetTop;
            eleSelector.style.left = (parseFloat(eleSelector.style.left) + e.movementX) + 'px';
            eleSelector.style.top = (parseFloat(eleSelector.style.top) + e.movementY) + 'px';
        }
    };
    init();
})();