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
            var picker=new jscolor(e.target);
            picker.show();
            console.log(picker);
        }

    };
    angular.module('freehand').controller('sidebarCtrl', ['sidebarValues', 'toolsOpt', 'fabricService', 'menuModes','propertyService', sidebarCtrl]);
})();