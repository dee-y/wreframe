/*
 * Fetches the property  for the current Oject
 */

(function () {

    'use strict';

    function propertyService($http) {

        var properties=[];

        function setProperties(prop,objProp) {
            var temp;
            var type=prop.value;
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
                angular.extend(properties[0].attr,properties[0].attr,objProp);
            });
        }
        ;
        return{
            properties:properties,
            setProperties: setProperties,
        }
    }
    ;

    angular.module('freehand').service('propertyService',['$http', propertyService]);

})();