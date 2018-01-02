/* 
 *Sidebar Controller
 */

(function () {

    'use strict';

    function sidebarCtrl(sidebarValues, toolsOpt, fabricService, menuModes) {
        var vm = this;

        vm.sidebarValues = sidebarValues;
        vm.menuModes = menuModes;
        vm.toolsOpt = toolsOpt;
        vm.obj = fabricService.objLen;

        //0 ->  tools , 1-> Outline, 2 -> properties
        vm.panels = {default: 0};

        vm.createEle = function (json) {
            fabricService.isEdited = true;
            fabricService.createObj(json);
        };

        vm.togglePanel = function (opt) {
            angular.forEach(vm.menuModes,function(mode,index){
                if(opt.name === mode.name){
                    mode.default = 0;
                }else{
                    mode.default =1;
                }
            });
            ;
        };

    };
    angular.module('freehand').controller('sidebarCtrl', ['sidebarValues', 'toolsOpt', 'fabricService', 'menuModes', sidebarCtrl]);
})();