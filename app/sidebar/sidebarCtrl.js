/* 
 *Sidebar Controller
 */

(function () {

    'use strict';

    function sidebarCtrl(fabricService, menuModes, propertyService, electronService) {
        var vm = this;

        vm.tools=[];
        vm.menuModes = menuModes;
        vm.obj = fabricService.objLen;
        vm.properties = propertyService.properties;
        vm.electronService = electronService;
        
        vm.createEle = function (json) {
            fabricService.isEdited = true;
            fabricService.createObj(json);
        };
        
        vm.getTools=function(){
          propertyService.getTools().then(function(res){
             var data=res.data;
             vm.tools=data.tools;
          });
        };

        vm.setProperty = function (prop,mapIndex) {
            fabricService.isEdited = true;
            console.log(prop.name);
            switch (prop.name) {
                case "Text":
                    fabricService.setText(prop.value,mapIndex);
                    break;
                case "Background":
                    fabricService.setBkgColor(prop.value,mapIndex);
                    break;
                case "Border Width":
                    fabricService.setBorderWidth(prop.value,mapIndex);
                    break;
                case "Font":
                    fabricService.setFontColor(prop.value,mapIndex);
                    break;
                case "Text Shadow":
                    fabricService.setShadow(prop.value,mapIndex);
                    break;
                default:

                    break;
            }

        };
        
        vm.loadFile=function(fileName){
          electronService.loadFile(fileName)  ;
        };
        
        vm.createNewProj=function(){
          electronService.fileActions({value:"new_proj"})  ;
        };


        vm.togglePanel = function (opt,side) {
            var modes=(side === 'left') ? vm.menuModes.left : vm.menuModes.right;
            angular.forEach(modes, function (mode, index) {
                if (opt.name === mode.name) {
                    if (mode.active === 1) {
                        mode.active = 0;
                    }
                } else {
                    mode.active = 1;
                }
            });
            ;
        };

        vm.setColorPicker = function (property,mapIndex) {
            setTimeout(function () {
                var e=property.name;
                var val=property.value;
                var buttonId=e+"-prop";
                var labelId=e+"-label";
                var ele = document.getElementById(buttonId);
                var label=document.getElementById(labelId);
                var colorpic=new jscolor(ele,{valueElement:label,hash:true,value:"transparent"});
                colorpic.fromString(val);
                colorpic.onFineChange = function(){
                        property.value=label.innerHTML;
                        vm.setProperty(property,mapIndex);
                }
            }, 300);
        };

    }
    ;
    angular.module('freehand').controller('sidebarCtrl', ['fabricService', 'menuModes', 'propertyService', 'electronService', sidebarCtrl]);
})();