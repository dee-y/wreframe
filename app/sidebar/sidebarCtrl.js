/* 
 *Sidebar Controller
 */

(function () {

    'use strict';

    function sidebarCtrl($scope, sidebarValues, toolsOpt, fabricService, menuModes, propertyService, electronService) {
        var vm = this;

        vm.sidebarValues = sidebarValues;
        vm.menuModes = menuModes;
        vm.toolsOpt = toolsOpt;
        vm.obj = fabricService.objLen;
        vm.properties = propertyService.properties;
        vm.folders = [];
        
        var updateFolders=function(files){
            vm.folders=files;
            $scope.$apply();
        };
        
        electronService.registerCallBack(updateFolders);
        
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
            angular.forEach(vm.menuModes, function (mode, index) {
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

        vm.setColorPicker = function (e) {
            setTimeout(function () {
                var ele = document.getElementById(e);
                new jscolor(ele);
            }, 1000);
        };

    }
    ;
    angular.module('freehand').controller('sidebarCtrl', ['$scope', 'sidebarValues', 'toolsOpt', 'fabricService', 'menuModes', 'propertyService', 'electronService', sidebarCtrl]);
})();