var drawShapes = (function(utilityService){
    
    'use strict';
    
    var ds = {};
    var shapesCount =0,elePadding=20,eleMargin = 12;
    var utlService=utilityService();
    var eleSelector;
    ds.selectedObj=null;
    
    ds.drawShape = function (dom,shape){
        var shapeDiv = document.createElement('div');
        shapeDiv.id=shape+"-shape-"+shapesCount;
        shapeDiv.classList.add(shape);
        shapeDiv.classList.add('shape');
        shapesCount++;
        dom.appendChild(shapeDiv);
        var refShape= document.getElementById(shapeDiv.id);
        ds.selectable(refShape);
        utlService.showStatus('Rectangle Created');
    };
    
    ds.unsetObj = function(){
      ds.selectedObj=null;  
      utlService.hide(eleSelector);
    };
    
    ds.selectable = function (dom){
        if(!eleSelector){
            eleSelector=document.getElementById('eleSelector');
        }
        dom.addEventListener('mousedown',function(e){e.stopPropagation();});
        dom.addEventListener('mouseup',function(e){e.stopPropagation();});
        
        dom.addEventListener('click',function(e){
            e.stopPropagation();
            var domProp=dom.getBoundingClientRect();

            var width=(parseFloat(domProp.width)+elePadding)+'px';
            var height=(parseFloat(domProp.height)+elePadding)+'px';
            var left=(parseFloat(domProp.x) - eleMargin) + 'px';
            var top=(parseFloat(domProp.y) - eleMargin) + 'px';
            eleSelector.style.width = width;
            eleSelector.style.height = height;
            eleSelector.style.left = left;
            eleSelector.style.top = top;
            ds.selectedObj=dom;
            utlService.show(eleSelector);
            utlService.showStatus('Object Selected');
        });
    };
    
    
    ds.movable = function(){
    };
    
    
    
    return{
        drawShape: function(dom,shape){
            ds.drawShape(dom,shape);
        },
        selectedObj: function (){
            return ds.selectedObj;
        },
        unsetObj: function(){
            ds.unsetObj();
        }
        
    };
    
})(utilityService);