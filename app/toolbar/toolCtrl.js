/* 
 * ToolBar Control for all the Upper Menu Controls
 */


(function(){
    
    'use strict';
    
    function toolbarCtrl(fabricService,fileMenuJson,electronService){
        var vm=this;
        
        vm.fileMenu=fileMenuJson;
        
        vm.deleteObj =function(){
            fabricService.deleteObj();
        };

        vm.fileActions =function(menu,category){
            switch (category) {
                case "file":
                    electronService.fileActions(menu);
                    break;
                case "animate":
                    if(menu.name === "Zoom"){
                        vm.toggleZoom(menu);
                    }
                    break;
                default:
                    //do nothing
                    break;
            }
        };
        
        vm.toggleZoom=function(zoomVal){
            if (zoomVal.value === "zoomin") {
                if (zoomVal.class === "active") {
                    zoomVal.value = "zoomout";
                    zoomVal.img = "zoom-out.png";
                    fabricService.zoomEnabled("zoomout");
                } else {
                    zoomVal.class = "active";
                    fabricService.zoomEnabled("zoomin");
                }
            } else {
                zoomVal.class = "";
                zoomVal.value = "zoomin";
                zoomVal.img = "zoom-in.png";
                fabricService.zoomDisabled();
            }
        };
        
        vm.editAction =function(menuJson){
            var menu=menuJson.value;
            switch (menu) {
                case "delete_obj":
                    vm.deleteObj();
                    break;
                    
                default:
                    
                    break;
            }
        };
    };
    
    angular.module("freehand").controller("toolbarCtrl",['fabricService','fileMenuJson','electronService',toolbarCtrl]);
    
})();