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
        vm.properties=[];

        vm.createEle = function (json) {
            fabricService.isEdited = true;
            fabricService.createObj(json);
        };
        
        var setPropertyValues = function () {
            var obj = {};
            obj = fabricService.getPropObj();
            if (obj.value) {
                propertyService.getProperties(obj.value).then(function (data) {
                    vm.properties =data.attr;
                });
            }
        };
        
        var deletePropertyValues = function (){
          while(vm.properties.length > 0)  {
              vm.properties.pop();
          }
        };

        vm.togglePanel = function (opt) {
            angular.forEach(vm.menuModes,function(mode,index){
                if(opt.name === mode.name){
                    if(mode.default === 1){
                        mode.default = 0;
                    if(mode.name === "Properties"){
                        setPropertyValues();
                    }else{
                        deletePropertyValues();
                    }
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