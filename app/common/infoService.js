/* 
 * Modal and Notification Service
 */

(function () {

    'use strict';

    function infoService() {
        var self = this;

        const {dialog} = require('electron').remote;
        let win = require('electron').remote.getCurrentWindow();
        var fs = require('fs');

        self.showAlertDialog = function (msg, yesFn, noFn) {
            var options = {type: "question", message: msg, buttons: ['Save', 'Disacard Changes']};
            dialog.showMessageBox(options, function (res) {
                if (res === 0) {
                    yesFn();
                } else {
                    noFn();
                }
            });
        };

        self.showInfoDialog = function (msg) {
            var options = {type: "info", message: msg};
            dialog.showMessageBox(options);
        };
    }
    ;


    angular.module("freehand").service("infoService", [infoService]);
})();


