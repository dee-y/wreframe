/* 
 *Sidebar Controller
 */

(function () {

    'use strict';

    function sidebarCtrl($http, fabricService, menuModes, propertyService, electronService) {
        var vm = this;

        vm.tools = [];
        vm.menuModes = menuModes;
        vm.obj = fabricService.objLen;
        vm.properties = propertyService.properties;
        vm.electronService = electronService;

        vm.createEle = function (json) {
            fabricService.isEdited = true;
            fabricService.createObj(json);
        };

        vm.getTools = function () {
            propertyService.getTools().then(function (res) {
                var data = res.data;
                vm.tools = data.tools;
            });
        };

        vm.fireEvt = function (prop, mapIndex) {
            switch (prop.name) {
                case "setTxt":
                    fabricService.setText(prop.value, mapIndex);
                    break;
                case "setFill":
                    fabricService.setBkgColor(prop.value, mapIndex);
                    break;
                case "setBorder":
                    fabricService.setBorderWidth(prop.value, mapIndex);
                    break;
                case "setBorderColor":
                    fabricService.setBorderColor(prop.value, mapIndex);
                    break;
                case "setTxtBorder":
                    fabricService.setBorderWidth(0.1, mapIndex);
                    break;
                default:

                    break;
            }
        };

        vm.setProperty = function (prop, mapIndex) {
            fabricService.isEdited = true;
            var customId = (fabricService.getCurrentObj().customId) ? fabricService.getCurrentObj().customId : null;
            if (customId) {
                $http.get('app/data/events/' + customId + '.json', {cache: true})
                        .then(
                                function (res) {
                                    var evt=res.data;
                                    for (var key in evt) {
                                        if(key === prop.name){
                                            var property={name:evt[key].fn,value:prop.value};
                                            vm.fireEvt(property,evt[key].mapIndex);
                                            break;
                                        }
                                        
                                    }
                                    return res.data;
                                },
                                function (err) {
                                    throw 'Cant find events';
                                }
                        );
            };
        };

        vm.loadFile = function (fileName) {
            electronService.loadFile(fileName);
        };

        vm.createNewProj = function () {
            electronService.fileActions({value: "new_proj"});
        };


        vm.togglePanel = function (opt, side) {
            var modes = (side === 'left') ? vm.menuModes.left : vm.menuModes.right;
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

        vm.setColorPicker = function (property, mapIndex) {
            setTimeout(function () {
                var e = property.name;
                var val = property.value;
                var buttonId = e + "-prop";
                var labelId = e + "-label";
                var ele = document.getElementById(buttonId);
                var label = document.getElementById(labelId);
                var colorpic = new jscolor(ele, {valueElement: label, hash: true, value: "transparent"});
                colorpic.fromString(val);
                colorpic.onFineChange = function () {
                    property.value = label.innerHTML;
                    vm.setProperty(property, mapIndex);
                };
            }, 300);
        };

    }
    ;
    angular.module('freehand').controller('sidebarCtrl', ['$http', 'fabricService', 'menuModes', 'propertyService', 'electronService', sidebarCtrl]);
})();