(function () {
    'use strict';

    function indexController($location, firebaseUrl, LoginService, $sessionStorage, $scope) {
        var vm = this;
        vm.title = 'indexController';
        //var ref = new Firebase(firebaseUrl);

        LoginService.setLoginDetails();

        if ($sessionStorage.isUserAuthenticated) {
            vm.userAuthenticated = true;
        }
        else {
            vm.userAuthenticated = false;
            $location.path('/dashboard');
        }


        $scope.navigateTo = function (url) {
            $location.path(url);
        }
    }

    angular.module('EL').controller('indexController', indexController);
    indexController.$inject = ['$location', 'firebaseUrl', 'LoginService', '$sessionStorage', '$scope'];
})();

