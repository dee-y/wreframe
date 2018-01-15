/*
 * Fetches the property  for the current Oject
 */

(function () {

    'use strict';

    function propertyService($http) {
        
        var self =this;
        self.properties=[];
        self.windowTitle="Untitled";
        
        self.setProperties = function(prop,objProp){
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
                while(self.properties.length > 0){
                    self.properties.pop();
                }
                self.properties.push(data);
                angular.extend(self.properties[0].attr,self.properties[0].attr,objProp);
            });
        };
    }
    ;

    angular.module('freehand').service('propertyService',['$http', propertyService]);

})();