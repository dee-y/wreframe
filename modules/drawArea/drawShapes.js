var drawShapes = (function(utilityService){
    
    'use strict';
    
    var ds = {};
    var shapesCount =0,elePadding=20,eleMargin = 12;
    var utlService=utilityService();
    var eleSelector;
    ds.selectedObj=null;
    
    ds.drawRect = function (dom){
        var rect = document.createElement('div');
        rect.id="rect-shape-"+shapesCount;
        rect.classList.add('rect');
        rect.classList.add('shape');
        shapesCount++;
        dom.appendChild(rect);
        var refRect= document.getElementById(rect.id);
        ds.selectable(refRect);
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
        });
    };
    
    
    ds.movable = function(){
    };
    
    
    
    return{
        drawRect: function(dom){
            ds.drawRect(dom);
        },
        selectedObj: function (){
            return ds.selectedObj;
        },
        unsetObj: function(){
            ds.unsetObj();
        }
        
    };
    
})(utilityService);