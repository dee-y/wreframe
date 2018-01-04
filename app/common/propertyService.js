/*
 * Fetches the property  for the current Oject
 */

(function () {

    'use strict';

    function propertyService($http) {

        var me = this;
        var properties={};

        function getProperties(type) {
            properties={};
            properties=$http.get('app/data/properties/' + type + '.json',{cache:true}).then(
                    function (res) {
                        console.log(res.data);
                       return res.data;
                    },
                    function () {
                        throw 'err';
                    }
            );
            return properties;
        }
        ;

        return{
            getProperties: getProperties
        }
    }
    ;

    angular.module('freehand').service('propertyService',['$http', propertyService]);

})();