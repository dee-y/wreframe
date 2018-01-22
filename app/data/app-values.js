/* 
 * Data for app
 */

(function () {

    'use strict';

    //0 = true , 1= false
    var menuModes =
            [
                {id: 0, default: 1, name: "Screens", active: 1,html:'folder.html'},
                {id: 1, default: 0, name: "Tools", active: 0,html:'tools.html'},
                {id: 2, default: 1, name: "Outline", active: 1,html:'outline.html'},
                {id: 3, default: 1, name: "Properties", active: 1,html:'properties.html'}
            ];

    angular.module('freehand').value('menuModes', menuModes);
    
    var folders =
            [
                {SRC: '/src/'},
                {SCREEN: '/screens/'},
                {PROP: '/properties/'},
                {ANI: '/animate/'},
                {ANI: '/comments/'}
                
            ];
            
     angular.module('freehand').constant('FOLDERS',folders);
    
    var fileMenuJson =
            [
                {id: 0, name: "New", value: "new_proj", class: "fh-plus"},
                {id: 1, name: "Open", value: "open_proj", class: "fh-folder-open"},
                {id: 2, name: "Save", value: "save_proj", class: "fh-floppy-o"},
                {id: 3, name: "Preview", value: "preview", class: "fh-play"},
                {id: 4, name: "Exit", value: "exit", class: "fh-exit"}
            ];

    angular.module('freehand').value('fileMenuJson', fileMenuJson);
})();