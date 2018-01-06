/*
 * Fetches the property  for the current Oject
 */

(function () {

    'use strict';

    function propertyService($http) {

        var properties=[];

        function getProperties(type) {
            var temp;
            temp=$http.get('app/data/properties/' + type + '.json',{cache:true}).then(
                    function (res) {
                       return res.data;
                    },
                    function () {
                        throw 'err';
                    }
            );
            temp.then(function(data){
                while(properties.length > 0){
                    properties.pop();
                }
                properties.push(data);
            });
        }
        ;
        
        function setProperty(){
            
        };
        
        
        return{
            properties:properties,
            getProperties: getProperties,
            
            
        }
    }
    ;

    angular.module('freehand').service('propertyService',['$http', propertyService]);

})();