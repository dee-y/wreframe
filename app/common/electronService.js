/*
 *Electron Service
 */

(function () {

    'use strict';
    function electronService($http,$timeout,$rootScope,fabricService,FOLDERS) {
        var self = this;

        self.projPath;
        self.newProjErr = false;
        self.files = {screens:[]};
        self.isNew = true;

        const {dialog} = require('electron').remote;
        let win = require('electron').remote.getCurrentWindow();
        var fs = require('fs');

        self.showOpenDialog = function (options) {
            dialog.showOpenDialog(options, function (path) {
                if (path === undefined) {
                    return;
                }
                self.projPath = path.toString();
                if (self.isNew === true) {
                    self.createNew();
                } else {
                    self.openProj();
                }
            });
        };


        self.createNew = function () {
            if (self.projPath) {
                var items = fs.readdirSync(self.projPath);
                if (items.length > 0) {
                    self.projPath = null;
                    throw 'Not an empty Dir';
                } else {
                    try {
                        for(var folder in FOLDERS){
                            fs.mkdirSync(self.projPath + FOLDERS[folder]);
                        }
                    } catch (err) {
                        throw err;
                    }
                }
                $timeout(function(){
                    $rootScope.$apply();
                },1000);
            }
        };


        self.openProj = function () {
            if (self.projPath) {
                var items = fs.readdirSync(self.projPath);
                if (items.length > 0) {
                    if (items.indexOf("screens") === -1) {
                        fs.mkdirSync(self.projPath + FOLDERS.SCREEN);
                    }
                    if (items.indexOf("src") === -1) {
                        fs.mkdirSync(self.projPath + FOLDERS.SRC);
                    }
                }
                self.updateFiles();
            }
        };
        
        self.saveProj = function(fileName){
          if(self.projPath)  {
              var items =fs.readdirSync(self.projPath);
              var mode=(fabricService.canvasMode.desktop === true) ? "desktop" : "mobile";
              var saveName=fileName+"-"+mode;
              if(items.indexOf("screens") !== -1 && items.indexOf("src") !== -1){
                  self.saveSrcFile(saveName);
                  self.createScreenPNG(saveName);
                  self.createPropFile(saveName);
                  fabricService.isEdited=false;
              }
          }
          self.updateFiles();
        };
        
        self.createPropFile= function(fileName){
          var objects=fabricService.genProperty()  ;
          fs.writeFile(self.projPath+FOLDERS.PROP+fileName+".json",objects,function (err){
             if(err !== null) {
                 throw err;
             }
          });
        };


        self.saveSrcFile = function (fileName) {
            var jsonData = fabricService.getJSONData();
            fs.writeFile(self.projPath +FOLDERS.SRC+fileName+".json", jsonData, function (err) {
                if(err !== null){
                    throw err;
                }
            });
        };

        self.createScreenPNG = function (fileName) {
            var imgData = fabricService.getImgData();
            var data = imgData.replace(/^data:image\/\w+;base64,/, "");
            var buf = new Buffer(data, 'base64');
            fs.writeFile(self.projPath + FOLDERS.SCREEN+fileName+".png", buf, function (err) {
                if(err !== null){
                    throw err;
                }
            });
        };

        self.updateFiles = function (callback = null) {
            if (self.projPath) {
                var path = self.projPath.replace(/\\/g, "/");
                var screens = [];
                var jsonFiles = fs.readdirSync(self.projPath + FOLDERS.SRC);
                var pngFiles = fs.readdirSync(self.projPath + FOLDERS.SCREEN);
                for (var file of pngFiles) {
                    var fileName = file.split('.');
                    fileName = fileName[0];
                    var check = fileName + ".json";
                    if (jsonFiles.indexOf(check) !== -1) {
                        screens.push({"name": fileName, "img": path + FOLDERS.SCREEN + fileName + '.png'});
                    }
                }
                angular.copy(screens, self.files.screens);
                $timeout(function(){
                    $rootScope.$apply();
                },1000);
            }
        };
        
        self.loadFile = function (fileName) {
            var check=fileName+".json";
            var objJson = null, propJson = null;
            var jsonFiles = fs.readdirSync(self.projPath + FOLDERS.SRC);
            for (var i = 0; i < jsonFiles.length; i++) {
                if(check === jsonFiles[i]){
                    $http.get(self.projPath + FOLDERS.SRC + check).then(function (res) {objJson = res.data;});
                    $http.get(self.projPath +FOLDERS.PROP + check).then(function (res) {propJson = res.data;});
                    $timeout(function(){
                        fabricService.loadFile(objJson,propJson);
                    },100);
                    break;
                }
            }
        };
        
        self.fileActions = function (btn) {
            switch (btn) {
                case "new_proj":
                    self.isNew = true;
                    var options = {title: 'Create New - Choose Folder', properties: ['openDirectory']};
                    self.showOpenDialog(options);
                    break;
                case "open_proj":
                    self.isNew = false;
                    var options = {title: 'Open Existing - Choose Folder', properties: ['openDirectory']};
                    self.showOpenDialog(options);
                    break;
                case "save_proj":
                    if (self.projPath) {
                        var fileName = fabricService.getFileName();
                        fileName = (fileName && fileName.length > 0) ? fileName : "Untitled";
                        self.saveProj(fileName);
                    } else {
                        self.isNew = true;
                        var options = {title: 'Create New - Choose Folder', properties: ['openDirectory']};
                        self.showOpenDialog(options);
                    }
                    break;
                case "exit":
                    win.close();
                    break;
                default:

                    break;
            }
        };

    }
    ;
    angular.module("freehand").service("electronService", ['$http','$timeout','$rootScope','fabricService','FOLDERS', electronService]);
})();