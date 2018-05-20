/* 
 * Draw Resize Module
 */

(function () {
    'use strict';

    var app = angular.module('wreframe.draw.resize', []);

    function resize() {

        var vm = this;
        vm.rightHandle={mouseDown:false,mouseUp:false,mouseMove:false};
        vm.downHandle={mouseDown:false,mouseUp:false,mouseMove:false};
        vm.divStyle={divWidth:null,divHeight:null};
        
        vm.init = function(){
            vm.divStyle.divWidth = window.innerWidth * 0.9 +'px';
            vm.divStyle.divHeight = window.innerHeight * 0.9 +'px';
        }
        
        vm.mouseUp = function(val){
            if(val === "right"){
                vm.rightHandle.mouseUp=true;
            }
            if(val === "down"){
                vm.downHandle.mouseUp=true;
            }
            console.log('Mouse UP',vm.rightHandle.mouseUp.toString());
        };
        
        vm.mouseDown = function(val){
            if(val === "right"){
                vm.rightHandle.mouseDown=true;
            }
            if(val === "down"){
                vm.downHandle.mouseDown=true;
            }
            console.log('Mouse DOWN',vm.rightHandle.mouseDown.toString());
        };
        
        vm.mouseMove = function (val) {
            if (val === "right" && vm.rightHandle.mouseDown === true) {
                vm.rightHandle.mouseMove = true;
                var divWidth = parseInt(vm.divStyle.divWidth);
                divWidth--;
                vm.divStyle.divWidth = divWidth + 'px';
            }
            if (val === "down" && vm.downHandle.mouseDown === true) {
                vm.downHandle.mouseMove = true;
            }
        };
    }
    ;
    app.controller('drawResize', resize);

})();

