/*
 *Electron Service
 */

(function () {

    'use strict';

    function electronService(fabricService) {
        const {dialog} = require('electron').remote;
        var fs = require('fs');

        var projPath=null;
        var newProjErr=false;
        var files=[];
        var callbackFn=null;

        function showOpenDialog(options, callback) {
            dialog.showOpenDialog(options, function (path) {
                if (path === undefined) {
                    return;
                }
                callback(path);
            });
        }
        ;
        
        function saveSrcFile(){
            var jsonData= fabricService.getJSONData();
            fs.writeFile(projPath+"/src/view.json",jsonData,function(err){
                
            });
        };

        function createScreenPNG() {
            var imgData = fabricService.getImgData();
            var data = imgData.replace(/^data:image\/\w+;base64,/, "");
            var buf = new Buffer(data, 'base64');
            fs.writeFile(projPath + "/wireframe/view.png", buf, function (err) {
            });
        }
        
        function registerCallBack(callback){
            callbackFn=callback;
        };

        function createNew(path) {
            var items = fs.readdirSync(path[0]);
            if (items.length > 0) {
                var options = {type: "error", title: "Invalid Directory", message: "Please choose empty directory"};
                dialog.showMessageBox(options);
                return;
            } else {
                fs.mkdir(path + '/src', setDirPath(err, path));
                fs.mkdir(path + '/wireframe', setDirPath(err, path));
                setTimeout(function () {
                    if (newProjErr === false) {
                        projPath = path[0].toString();
                    }
                }, 1000);
            }
        }
        ;
        
        function openProj(path) {
            if (path === undefined) {
                return;
            }
            var findWire = false;
            var findSrc = false;
            while(files.length > 0){
                files.pop();
            }
            var items = fs.readdirSync(path[0]);
            
            for (var item of items) {
                findWire = (item === "wireframe" || findWire === true) ? true : false;
                findSrc = (item === "src" || findSrc === true) ? true : false;
                files.push(item);
            }
            if (findSrc === true && findWire === true) {
                projPath = path[0].toString();
                callbackFn(items);
            }
        }
        ;

        function setDirPath(err,path) {
            if (err !== null) {
                newProjErr=true;
            }
        }


        function fileActions(btn) {
            var options = {};
            switch (btn.value) {
                case "new_proj":
                    options = {title: 'Create New - Choose Folder', properties: ['openDirectory']};
                    showOpenDialog(options, createNew);
                    break;
                case "open_proj":
                    options = {title: 'Open Existing - Choose Folder', properties: ['openDirectory']};
                    showOpenDialog(options, openProj);
                    break;
                case "save_proj":
                    if (projPath !== null) {
                        var items = fs.readdirSync(projPath);
                        items.forEach(function (fldname, index) {
                            if (fldname === 'wireframe') {
                                createScreenPNG();
                            }
                            if (fldname === 'src') {
                                saveSrcFile();
                            }
                        });
                    }
                    break;
                case "exit":
                    let win = require('electron').remote.getCurrentWindow();
                    win.close();
                    break;
                default:

                    break;
            }
        }
        ;
        
        return{
            fileActions: fileActions,
            files:files,
            registerCallBack:registerCallBack
        };

    }
    ;

    angular.module("freehand").service("electronService", ['fabricService', electronService]);
})();