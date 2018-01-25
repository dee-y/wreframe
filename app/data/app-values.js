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
                    {id: 2, default: 0, name: "Libraries", active: 1, html: ''},
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
                ],

                animate: [
                    {id: 0, name: "Preview", value: "preview", class: "fh-play"},
                    {id: 1, name: "Zoom In", value: "zoomin", class: "fh-zoom-in"},
                    {id: 2, name: "Zoom Out", value: "zoomin", class: "fh-zoom-out"},
                ],
                
                view:[
                    {id: 0, name: "Mobile", value: "mobile", class: "fh-mobile"},
                    {id: 1, name: "Desktop", value: "desktop", class: "fh-desktop"},
                    {id: 2, name: "Tablet", value: "tablet", class: "fh-tablet"},
                ],
                team:[
                    {id: 0, name: "Share", value: "mobile", class: "fh-share"},
                    {id: 1, name: "Notification", value: "notify", class: "fh-notify"},
                    {id: 2, name: "Comment Mode", value: "comment", class: "fh-cmt-mode"},
                ],
                app:[
                     {id: 0, name: "Settings", value: "settings", class: "fh-settings"},
                     {id: 1, name: "Help", value: "help", class: "fh-help"},
                    {id: 2, name: "About", value: "info", class: "fh-info"}
                ],
                ext:[
                    {id: 0, name: "Exit", value: "exit", class: "fh-exit"}
                ]
            };

    angular.module('freehand').value('fileMenuJson', fileMenuJson);
})();