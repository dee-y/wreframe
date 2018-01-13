/*
 * Electron Start Up File
 * Contains Logic to start web to destop app
 * 
 */
(function () {

    'use strict';

    const electron = require('electron');
    const path = require('path');
    const url = require('url');
    const {app, BrowserWindow} = electron;
    
    let win=null;

    app.on('ready', () => {
        initialize();   
    });
    
    function initialize (){
        win = new BrowserWindow({width: 800, height: 700,frame:false});
        win.loadURL(url.format({
            pathname: path.join(__dirname, '/../../index.html'),
            protocol: 'file:',
            slashes: true
        }))
        win.maximize();
    };
})();