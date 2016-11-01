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
                        if (authData.uid == '7e53fa8a-663c-4908-af54-f9af1968d0be') {
                            $sessionStorage.userType = 'student';
                        } else if (authData.uid == 'edc71a7e-34dc-453a-9b02-1ef84b898f65') {
                            $sessionStorage.userType = 'lecturer';
                        } else if (authData.uid == '40abbd8f-afba-4bfc-a162-9e7918533f2d') {
                            $sessionStorage.userType = 'admin';
                        }
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
