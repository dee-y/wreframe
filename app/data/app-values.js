/* 
 * Data for app
 */

(function () {

    'use strict';

    //0 = true , 1= false
    var menuModes =
            {
                left: [
                    {id: 0, default: 1, name: "Screens", active: 1, html: 'folder.html'},
                    {id: 1, default: 0, name: "Tools", active: 0, html: 'tools.html'},
                ],
                right: [
                    {id: 0, default: 1, name: "Outline", active: 1, html: 'outline.html'},
                    {id: 1, default: 1, name: "Properties", active: 0, html: 'properties.html'}
                ]
            };

    angular.module('freehand').value('menuModes', menuModes);
    
    var folders = {SRC: '/src/',SCREEN: '/screens/',PROP: '/properties/',ANI: '/animate/',CMT: '/comments/'};
            
     angular.module('freehand').constant('FOLDERS',folders);
    
    var fileMenuJson =
            {
                file: [
                    {id: 0, name: "New", value: "new_proj", class: "fh-plus"},
                    {id: 1, name: "Open", value: "open_proj", class: "fh-folder-open"},
                    {id: 2, name: "Save", value: "save_proj", class: "fh-floppy-o"},
                    {id: 3, name: "Exit", value: "exit", class: "fh-exit"}
                ],

                animate: [
                    {id: 0, name: "Preview", value: "preview", class: "fh-play"},
                    {id: 1, name: "Zoom In", value: "zoomin", class: "fh-zoom-in"},
                    {id: 2, name: "Zoom Out", value: "zoomin", class: "fh-zoom-out"},
                ]
            };

    angular.module('freehand').value('fileMenuJson', fileMenuJson);
})();