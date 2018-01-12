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
           // jsonData=JSON.parse(jsonData);
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

        function createNew(path) {
            fs.readdir(path[0], function (err, items) {
                if (items.length > 0) {
                    var options = {type: "error", title: "Invalid Directory", message: "Please choose empty directory"};
                    dialog.showMessageBox(options);
                    return;
                } else {
                    fs.mkdir(path + '/src', setDirPath(err, path));
                    fs.mkdir(path + '/wireframe', setDirPath(err,path));
                    setTimeout(function(){
                        if(newProjErr === false){
                            projPath=path[0].toString();
                        }
                    },1000);
                }
            });
        }
        ;
        
        function openProj(path){
          if(path === undefined )  {
              return;
          }
          var findWire=false;
          var findSrc= false;
          fs.readdir(path[0],function(err,items){
             items.forEach(function(fldname,index){
                 if(fldname === "wireframe"){
                     findWire=true;
                 };
                 if(fldname === "src"){
                     findSrc=true;
                 };
             }) ;
             
                if(findSrc === true && findWire === true){
                    //Read File
                    projPath=path[0].toString();
                }
          });
        };

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
                        fs.readdir(projPath, function (err, items) {
                            items.forEach(function (fldname, index) {
                                if (fldname === 'wireframe') {
                                    createScreenPNG();
                                }
                                if(fldname === 'src'){
                                    saveSrcFile();
                                }
                            })
                        });
                    }
                    break;
                default:

                    break;
            }
        }
        ;

        return{
            fileActions: fileActions
        };

    }
    ;

    angular.module("freehand").service("electronService", ['fabricService', electronService]);
})();