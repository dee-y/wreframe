(function (drawShapes,utilityService) {

    'use strict';

    var eleSelector;
    var eleActive = false;
    var elePaddingLeft, elePaddingTop;
    var ds= drawShapes;
    var utilService= utilityService();
    
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
       utilService.showStatus('Object Moved');
       ds.unsetObj();
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
            var movX=e.movementX;
            var movY=e.movementY;
            eleSelector.style.left = (parseFloat(eleSelector.style.left) + movX) + 'px';
            eleSelector.style.top = (parseFloat(eleSelector.style.top) + movY) + 'px';
            var ele=ds.selectedObj();
            if(ele){
                var lt= (ele.style.left) ? ele.style.left : ele.offsetLeft ;
                var tp= (ele.style.top) ? ele.style.top : ele.offsetTop ;
                ele.style.left = (parseFloat(lt) + movX) + 'px';
                ele.style.top = (parseFloat(tp) + movY) + 'px';
            }
        }
    };
    init();
})(drawShapes,utilityService);