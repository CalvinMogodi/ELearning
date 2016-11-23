(function () {
    'use strict';

    function CourseFactory($http) {
        var service = {
            getData: getData
        };

        return service;

        function getData() { }
    }

    angular.module('EL').factory('CourseFactory', CourseFactory);
    CourseFactory.$inject = ['$http'];
})();