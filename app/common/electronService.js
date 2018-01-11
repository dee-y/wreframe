/*
*Electron Service
*/

(function(){

    'use strict';

    function electronService(fabricService){
        const {dialog} = require('electron').remote;
        var fs= require('fs');

        function showOpenDialog(options,callback){
                dialog.showOpenDialog(options,function(path){
                    callback(path);
                });
        };
        
        function createScreenPNG(path){
            var imgData =fabricService.getImgData();
            var data = imgData.replace(/^data:image\/\w+;base64,/, "");
            var buf = new Buffer(data, 'base64');
            fs.writeFile(path+"/1.png",buf,function(err){
                console.log(err);
            });
        }
        
        function createNew(path){
            fs.mkdir(path+'/src',function(err){
                console.log(err);
            });
            fs.mkdirSync(path+'/wireframe');
        };
        
        function openProj(path){
            
        };
        
        function fileActions(btn){
            var options={};
            console.log(btn);
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

    angular.module("freehand").service("electronService",['fabricService',electronService]);
})();