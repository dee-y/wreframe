var utilityService =(function(){
    
    var sr = this;
    sr.domList=[];
    var timeout = 2000;
    
    var showStatus = function (msg){
        sr.domList.forEach(function(domIn,index){
            domIn.dom.innerHTML =msg;
            clearMsg(domIn.dom);
        });
    };
    
    var hide= function(dom){
        dom.classList.remove('show');
        dom.classList.add('hide');
    };
    
    var show= function(dom){
        dom.classList.remove('hide');
        dom.classList.add('show');
    };

    var toggle = function (dom,selector) {
        dom.addEventListener('click',function () {
           var ele=document.querySelector(selector);
           dom.classList.toggle("expand");
           dom.classList.toggle("collapse");
           if(ele){
               ele.classList.toggle("hide");
               ele.parentNode.classList.toggle("active");
           }
        });
    };

    
    var clearMsg = function(dom){
        setTimeout(function(){
            dom.innerHTML = '';
        },timeout);
    };
    
    sr.registerDOM = function(dom,type){
        sr.domList.push({dom:dom,type:type});
    };
    
    return {
        showStatus:function(msg){
            showStatus(msg);
        },
        registerDOM : function(dom,type){
            sr.registerDOM(dom,type);
        },
        toggle: function (dom,selector){
          toggle(dom,selector);
        },
        show: function(dom){
            show(dom);
        },
        hide:function(dom){
            hide(dom);
        }
    };
});