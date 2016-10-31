(function () {
    'use strict';

    function LoginController($location, $scope, $sessionStorage, $rootScope, LoginService, firebaseUrl) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'indexController';
        var ref = new Firebase("https://eoh-intranet.firebaseio.com");
        vm.login = {};

        $rootScope.profileImage = 'assets/img/placeholder.png';

        $scope.login = function (user) {

            //ref.createUser({
            //    email: "olivier@stockmanagement.co.za",
            //    password: "olivier"
            //}, function (error, userData) {
            //    if (error) {
            //        console.log("Error creating user:", error);
            //    } else {
            //        console.log("Successfully created user account with uid:", userData.uid);
            //    }
            //});

            ref.authWithPassword({
                email: user.username,
                password: user.password
            }, function (error, authData) {
                if (error) {
                    console.log("Login Failed!", error);
                } else {
                    $scope.$apply(function () {
                        console.log("Authenticated successfully with payload:", authData);
                        $sessionStorage.isUserAuthenticated = true;
                        $sessionStorage.displayName = 'Administrator';
                        $sessionStorage.profileImage = '';
                        $sessionStorage.idNumber = '123456789';
                        $sessionStorage.userType = 'admin';
                        LoginService.setLoginDetails();
                        $location.path('/dashboard');
                    });
                }
            });
        }

        $scope.loginWithFacebook = function (credentials) {

            ref.authWithOAuthPopup("facebook", function (error, authData) {
                if (error) {
                    console.log("Login Failed!", error);
                } else {
                    $scope.$apply(function () {
                        console.log("Authenticated successfully with payload:", authData);
                        $sessionStorage.isUserAuthenticated = true;
                        $sessionStorage.userType = 'employee';
                        $sessionStorage.displayName = authData.facebook.displayName;
                        $sessionStorage.profileImage = authData.facebook.profileImageURL;
                        $sessionStorage.idNumber = authData.facebook.cachedUserProfile.id;
                        LoginService.setLoginDetails();
                        $location.path('/dashboard');
                    });

                }

            });
        }

    }

    angular.module('EL').controller('LoginController', LoginController);
    LoginController.$inject = ['$location', '$scope', '$sessionStorage', '$rootScope', 'LoginService', 'firebaseUrl'];
})();
