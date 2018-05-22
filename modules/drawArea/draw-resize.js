/* 
 * Draw Resize Module
 */

(function () {
    'use strict';

    var app = angular.module('wreframe.draw.resize', []);

    function resize() {
        var vm = this;
        vm.drawArea = {dwidth: 0, dheight: 0};
        vm.resize = false;
        vm.startX = 0;
        vm.startY = 0;

        vm.init = function () {
            vm.drawArea.dwidth = window.innerWidth * 0.9 + 'px';
            vm.drawArea.dheight = window.innerHeight * 0.9 + 'px';
            $("#drawArea").resizable();
        };
    }
    ;
    app.controller('drawResize', resize);

})();