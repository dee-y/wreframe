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
                    {id: 2, default: 0, name: "Libraries", active: 1, html: 'library.html'},
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
                    {id: 0, name: "New", value: "new_proj", img: "add.png"},
                    {id: 1, name: "Open", value: "open_proj", img: "open-folder.png"},
                    {id: 2, name: "Save", value: "save_proj", img: "floppy-disk.png"},
                ],

                animate: [
                    {id: 0, name: "Preview", value: "preview", img: "play-button.png"},
                    {id: 1, name: "Zoom In", value: "zoomin", img: "zoom-in.png"},
                    {id: 2, name: "Zoom Out", value: "zoomin", img: "zoom-out.png"},
                ],
                
                view:[
                    {id: 0, name: "Mobile", value: "mobile", img: "mobile-phone.png"},
                    {id: 1, name: "Desktop", value: "desktop", img: "desktop.png",class:"active"},
                    {id: 2, name: "Tablet", value: "tablet", img: "tablet.png"},
                ],
                team:[
                    {id: 0, name: "Share", value: "mobile", img: "share.png"},
                    {id: 1, name: "Notification", value: "notify", img: "notify.png"},
                    {id: 2, name: "Comment Mode", value: "comment", img: "comment.png"},
                ],
                app:[
                     {id: 0, name: "Settings", value: "settings", img: "settings.png"},
                     {id: 1, name: "Help", value: "help", img: "help.png"},
                    {id: 2, name: "About", value: "info", img: "info.png"}
                ],
                ext:[
                    {id: 0, name: "Exit", value: "exit", img: "exit.png"}
                ]
            };

    angular.module('freehand').value('fileMenuJson', fileMenuJson);
})();