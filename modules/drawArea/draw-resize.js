/* 
 * Draw Resize Module
 */

(function () {
    'use strict';

    var app = angular.module('wreframe.draw.resize', []);

    function resize($timeout) {
        var vm = this;
        vm.drawArea = {dwidth: 0, dheight: 0 , mWidth:0 , mHeight:0};
        vm.resize = false;
        vm.startX = 0;
        vm.startY = 0;

        vm.init = function () {
            var maxWidth = window.screen.availWidth;
            var maxHeight = window.screen.availHeight;
            $timeout(function () {
                if (maxWidth > 300) {
                    vm.drawArea.mWidth =  vm.drawArea.dwidth = (maxWidth * 0.8) + 'px';
                    vm.drawArea.mHeight = vm.drawArea.dheight =(maxHeight * 0.8) + 'px';
                    $("#drawArea").resizable(
                            {
                                maxHeight: (maxHeight * 0.8),
                                maxWidth: (maxWidth * 0.8),
                                minHeight: 200,
                                minWidth: 200
                            }
                    );
                }
            }, 1000);

        };
    }
    ;
    app.controller('drawResize', ['$timeout',resize]);

})();