var drawShapes = (function(){
    
    'use strict';
    
    var ds = {};
    var shapesCount =0;
    
    ds.drawRect = function (dom){
        var rect = document.createElement('div');
        rect.id="rect-shape-"+shapesCount;
        rect.classList.add('rect');
        rect.classList.add('shape');
        shapesCount++;
        dom.appendChild(rect);
    };
    
    ds.selectable = function (dom){
        
    }.
    
    
    ds.movable = function(dom){
        
    };
    
    
    
    return{
        drawRect: function(dom){
            ds.drawRect(dom);
        }
    };
    
})();