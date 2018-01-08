/*
*Electron Service
*/

(function(){

    'use strict';

    function electronService(){
        const {dialog} = require('electron').remote;

        function showOpenDialog(options,callback){
                dialog.showOpenDialog(options,function(path){
                    callback(path);
                });
        };
        
        function createNew(path){
            
        };
        
        function openProj(path){
            
        };
        
        function fileActions(btn){
            var options={};
            switch (btn.value) {
                case "new_proj":
                    options={title: 'Create New - Choose Folder', properties: ['openDirectory']};
                    showOpenDialog(options,createNew);
                    break;
                case "open_proj":
                    options={title: 'Open Existing - Choose Folder', properties: ['openDirectory']};
                    showOpenDialog(options,openProj);
                    break;
                default:

                    break;
            }
        };

        return{
            fileActions:fileActions
        };

    };

    angular.module("freehand").service("electronService",[electronService]);
})();