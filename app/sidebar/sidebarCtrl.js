/* 
 *Sidebar Controller
 */


(function () {

    'use strict';

    function sidebarCtrl(sidebarValues,toolsOpt, fabricService, menuModes) {
        var vm = this;

        vm.sidebarValues = sidebarValues;
        vm.menuModes = menuModes;
        vm.toolsOpt = toolsOpt;
        vm.obj=fabricService.objLen;

        vm.createEle = function (json) {
            fabricService.isEdited = true;
            switch (json.name) {
                case 'popup':
                    fabricService.createPopup();
                    break;
                case 'button':
                    fabricService.createBtn();
                    break;
                case 'cntText':
                    fabricService.createContentTxt();
                    break;
                case 'dummyTxt':
                    fabricService.createDummyTxt();
                    break;
                case 'progressbar':
                    break;
                case 'imgplaceholder':
                    fabricService.createIMH();
                    break;
                case 'avatar':
                    fabricService.createAvatar();
                    break;
                case 'txtBox':
                    fabricService.createTxtBox();
                    break;
                default:

            }
        };

    }
    ;

    angular.module('freehand').controller('sidebarCtrl', ['sidebarValues','toolsOpt', 'fabricService', 'menuModes', sidebarCtrl]);


})();

