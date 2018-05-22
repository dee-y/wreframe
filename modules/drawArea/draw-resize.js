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
            var maxWidth=window.innerWidth * 0.9;
            var maxHeight=window.innerHeight * 0.9;
            vm.drawArea.dwidth =  maxWidth+ 'px';
            vm.drawArea.dheight = maxHeight+ 'px';
            $("#drawArea").resizable(
                    {
                        maxHeight: maxHeight,
                        maxWidth: maxWidth,
                        minHeight: 200,
                        minWidth: 200
                    }
            );
        };
    }
    ;
    app.controller('drawResize', resize);

})();