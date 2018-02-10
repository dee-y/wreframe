/* 
 * Contains Core Configuraion Module
 * 
 */

(function(){
   
   'use strict';
   
   var app= angular.module('freehand',['ui.router']);
   
   app.config(function($stateProvider,$urlRouterProvider){
       var home={
           url:'/',
           views:{
               'left-nav':{
                   'templateUrl':'app/sidebar/sidebar-left.html',
                   'controller':'sidebarCtrl',
                   'controllerAs':'sc'
               },
               'main-view':{
                   'templateUrl':'app/drawArea/draw.html',
                   'controller':'drawCtrl',
                   'controllerAs':'dc'
               },
               'right-nav':{
                   'templateUrl':'app/sidebar/sidebar-right.html',
                   'controller':'sidebarCtrl',
                   'controllerAs':'sc'
               }
           }
       };
       
       $stateProvider.state("home",home);
       $urlRouterProvider.when('',"/");
       
   });
    
})();
