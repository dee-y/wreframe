/* 
 *Sidebar Controller
 */

(function () {

    'use strict';

    function sidebarCtrl(sidebarValues, toolsOpt, fabricService, menuModes,propertyService) {
        var vm = this;

        vm.sidebarValues = sidebarValues;
        vm.menuModes = menuModes;
        vm.toolsOpt = toolsOpt;
        vm.obj = fabricService.objLen;
        vm.properties=propertyService.properties;

        vm.createEle = function (json) {
            fabricService.isEdited = true;
            fabricService.createObj(json);
        };
        
        vm.setProperty = function (prop) {
            switch (prop.type) {
                case "text":
                    fabricService.setText(prop.value);
                    break;            
                default:
                    
                    break;
            }
            
        };
        

        vm.togglePanel = function (opt) {
            angular.forEach(vm.menuModes,function(mode,index){
                if(opt.name === mode.name){
                    if(mode.default === 1){
                        mode.default = 0;
                    }
                }else{
                    mode.default =1;
                }
            });
            ;
        };
        
        vm.setColorPicker=function(e){
            setTimeout(function(){
                var ele=document.getElementById(e);
                new jscolor(ele);
            },1000);
        };

    };
    angular.module('freehand').controller('sidebarCtrl', ['sidebarValues', 'toolsOpt', 'fabricService', 'menuModes','propertyService', sidebarCtrl]);
})();