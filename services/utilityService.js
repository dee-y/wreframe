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
        }
    };
});