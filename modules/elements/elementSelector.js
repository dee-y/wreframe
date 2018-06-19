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
    
    
    function removeSelection(){
       eleActive = false;
       document.removeEventListener('mousemove', moveObj);
    }

    function setListeners() {
        eleSelector.addEventListener('mousedown', function (e) {
            eleActive = true;
            document.addEventListener('mousemove', moveObj);
        });
        eleSelector.addEventListener('mouseup', function (e) {
            removeSelection();
        });
    };
    
    function moveObj(e) {
        if(e.buttons === 0){
            removeSelection();
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