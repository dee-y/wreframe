/*
*Electron Service
*/

(function(){

    'use strict';


    function electronService(){
        const {dialog} = require('electron').remote;

        function createProj(){
            var options = {title: 'Create New Project - Choose Folder',properties:['openDirectory']};
                dialog.showOpenDialog(options,function(path){
                    console.log(path);
                });
        };

        return{
            createProj:createProj
        };

    };

    angular.module("freehand").service("electronService",[electronService]);
})();