var drawShapes = (function(evtService,utilityService){
    
    'use strict';
    
    var ds = {};
    var shapesCount =0,elePadding=20,eleMargin = 12;
    var utlService=utilityService();
    var evtService= evtService;
    var eleSelector;
    ds.selectedObj=null;
    ds.currentShape=null;
    
    ds.drawShape = function (dom,shape){
        var shapeDiv = document.createElement('div');
        shapeDiv.id=shape+"-shape-"+shapesCount;
        shapeDiv.classList.add(shape);
        shapeDiv.classList.add('shape');
        shapesCount++;
        dom.appendChild(shapeDiv);
        ds.currentShape= document.getElementById(shapeDiv.id);
        evtService.fetchData('./data/shapes/'+shape+'.json',ds.setStyle);
        ds.selectable(ds.currentShape);
        utlService.showStatus('Rectangle Created');
    };
    
    ds.setStyle = function(style){
        if(style && ds.currentShape){
            var applyStyle= JSON.parse(style);
            if(applyStyle.styles){
                for (var key in applyStyle.styles) {
                    var val=applyStyle.styles[key];
                    ds.currentShape.style[key] = val;
                }
            }
        }
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
    
    
    return{
        drawShape: function(dom,shape){
            ds.drawShape(dom,shape);
        },
        selectedObj: function (){
            return ds.selectedObj;
        },
        unsetObj: function(){
            ds.unsetObj();
        },
        setStyle: function(style){
            ds.setStyle(style);
        }
        
    };
    
})(evtService,utilityService);