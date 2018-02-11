/* 
 * ToolBar Control for all the Upper Menu Controls
 */


(function () {

    'use strict';

    function toolbarCtrl($state,fabricService, fileMenuJson, electronService, infoService) {
        var vm = this;

        vm.fileMenu = fileMenuJson;

        vm.deleteObj = function () {
            fabricService.deleteObj();
        };

        vm.fileActions = function (menu, category) {
            console.log(menu);
            switch (category) {
                case "file":
                    electronService.fileActions(menu.value);
                    break;
                case "animate":
                    if (menu.name === "Zoom") {
                        vm.toggleZoom(menu);
                    }
                    if (menu.value === "interact") {
                        vm.toggleAnimate(menu);
                    }
                    break;
                case "view":
                    if (fabricService.isEdited === false) {
                        vm.toggleMode(menu);
                    } else {
                        infoService.showAlertDialog("Do you want to save Changes?",
                                function () {
                                    electronService.fileActions("save_proj");
                                },
                                function () {
                                    vm.toggleMode(menu);
                                }
                        );
                    }
                    break;
                case "ext":
                    if (fabricService.isEdited === false) {
                        electronService.fileActions(menu.value);
                    } else {
                        infoService.showAlertDialog("Do you want to save Changes?",
                                function () {
                                    electronService.fileActions("save_proj");
                                },
                                function () {
                                    electronService.fileActions(menu.value);
                                }
                        );
                    }
                    break;
                default:
                    //do nothing
                    break;
            }
        };

        vm.toggleAnimate= function(menu){
            if (fabricService.isEdited === false) {
                if (!electronService.projPath) {
                    infoService.showInfoDialog("No Projects Found.");
                }else{
                    $state.go('animate');
                }
            } else {
                infoService.showAlertDialog("Do you want to save Changes?",
                        function () {
                            electronService.fileActions("save_proj");
                        },
                        function () {
                            //Action here
                        }
                );
            }
        };
        
        vm.toggleMode = function (menu) {
            if (menu.class !== "active") {
                fileMenuJson.view.forEach(function (item, index) {
                    if (item.value === menu.value) {
                        item.class = "active";
                    } else {
                        item.class = "";
                    }
                });
                fabricService.resizeCanvas(menu);
            }
        };

        vm.toggleZoom = function (zoomVal) {
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

        vm.editAction = function (menuJson) {
            var menu = menuJson.value;
            switch (menu) {
                case "delete_obj":
                    vm.deleteObj();
                    break;

                default:

                    break;
            }
        };
    }
    ;

    angular.module("freehand").controller("toolbarCtrl", ['$state','fabricService', 'fileMenuJson', 'electronService', 'infoService', toolbarCtrl]);

})();