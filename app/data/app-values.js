/* 
 * Data for app
 */

(function () {

    'use strict';

    var sidebarJson =
            [
                {"name": "button", "value": "Button", "class": "fh-draw-btn"},
                {"name": "txtBox", "value": "Text Box", "class": "fh-draw-txtBox"},
                {"name": "chkBox", "value": "Check Box", "class": "fh-draw-chk"},
                {"name": "radioBtn", "value": "Radio Button", "class": "fh-draw-rdo"},
                {"name": "dropDown", "value": "Drop Down", "class": "fh-draw-dropdwn"},
                {"name": "cntTxt", "value": "Content Place Holder", "class": "fh-draw-conTxt"},
                {"name": "dummyTxt", "value": "Lorem Ipsum", "class": "fh-draw-txt"},
                {"name": "progressbar", "value": "Progress Bar", "class": "fh-draw-prg"},
                {"name": "img", "value": "Image Place Holder", "class": "fh-draw-img"},
                {"name": "popup", "value": "Pop-up", "class": "fh-draw-pop-up"},
                {"name": "avatar", "value": "Avatar", "class": "fh-draw-avt"},
                {"name": "tab", "value": "Tabbed Window", "class": "fh-draw-tab"}

            ];
    angular.module('freehand').value('sidebarValues', sidebarJson);


    //0 = true , 1= false
    var menuModes =
            [
                {id: 0, default: 0, name: "Tools", active: 0},
                {id: 1, default: 1, name: "Properties", active: 1},
            ];

    angular.module('freehand').value('menuModes', menuModes);


    var fileMenuJson =
            [
                {id: 0, name: "New", value: "new_proj", class: "fh-plus"},
                {id: 1, name: "Open", value: "open_proj", class: "fh-folder-open"},
                {id: 2, name: "Save", value: "save_proj", class: "fh-floppy-o"},
                {id: 3, name: "Preview", value: "preview", class: "fh-play"},
            ];

    angular.module('freehand').value('fileMenuJson', fileMenuJson);

    var editMenuJson =
            [
                {id: 0, name: "Clone Object", value: "copy_obj", class: "fh-file-copy"},
                {id: 0, name: "Delete Object", value: "delete_obj", class: "fh-file-delete"}
            ];

    angular.module('freehand').value('editMenuJson', editMenuJson);

    var toolsOpt =
            [
                {id: 0,name: "Default",value:"default","default":0},
                {id: 1,name: "Forms",value:"frm","default":1},
                {id: 2,name: "Person",value:"person","default":1},
                {id: 3,name: "Maps",value:"maps","default":1},
                {id: 4,name: "Charts",value:"charts","default":1},
                {id: 5,name: "Windows",value:"window","default":1},
                {id: 6,name: "Flow Chart",value:"flowchart","default":1}
            ];
            
            angular.module("freehand").value("toolsOpt",toolsOpt);

})();

