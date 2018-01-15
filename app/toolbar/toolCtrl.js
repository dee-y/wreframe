/* 
 * ToolBar Control for all the Upper Menu Controls
 */


(function(){
    
    'use strict';
    
    function toolbarCtrl(fabricService,fileMenuJson,editMenuJson,electronService){
        var vm=this;
        
        vm.fileMenu=fileMenuJson;
        vm.editMenu=editMenuJson;
        
        vm.deleteObj =function(){
            fabricService.deleteObj();
        };

        vm.fileActions =function(menu){
            electronService.fileActions(menu);
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
    
    angular.module("freehand").controller("toolbarCtrl",['fabricService','fileMenuJson','editMenuJson','electronService',toolbarCtrl]);
    
})();