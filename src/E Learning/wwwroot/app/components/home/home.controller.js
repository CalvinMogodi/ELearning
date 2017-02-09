(function () {
    'use strict';

    function homeController($location) {
        /* jshint validthis:true */
        var vm = this;

        vm.navigateTo = function (url) {
            $location.path(url);
        }

    }

    angular.module('EL').controller('homeController', homeController);
    homeController.$inject = ['$location'];
})();
