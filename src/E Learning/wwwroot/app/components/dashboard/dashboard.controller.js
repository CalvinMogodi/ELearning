(function () {
    'use strict';

    function dashboardController($location, $sessionStorage) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'dashboard';

        vm.navigateTo = function (url) {
            $location.path(url);
        }
    }

    angular.module('EL').controller('dashboardController', dashboardController);
    dashboardController.$inject = ['$location', '$sessionStorage'];
})();
