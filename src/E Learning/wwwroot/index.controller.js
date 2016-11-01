﻿(function () {
    'use strict';

    function indexController($location, firebaseUrl, LoginService, $sessionStorage, $scope, $rootScope) {
        var vm = this;
        vm.title = 'indexController';
        //var ref = new Firebase(firebaseUrl);

        LoginService.setLoginDetails();

        if ($sessionStorage.isUserAuthenticated) {
            vm.userAuthenticated = true;
        }
        else {
            vm.userAuthenticated = false;
            $location.path('/login');
        }

        $scope.navigateTo = function (url) {
            $location.path(url);
        }

        $rootScope.$on('$locationChangeSuccess', routeChanged);
        function routeChanged(evt, newUrl, oldUrl) {
            $scope.userType = $sessionStorage.userType;
        }
    }

    angular.module('EL').controller('indexController', indexController);
    indexController.$inject = ['$location', 'firebaseUrl', 'LoginService', '$sessionStorage', '$scope', '$rootScope'];
})();

