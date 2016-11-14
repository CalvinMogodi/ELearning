(function () {
    'use strict';

    function LoginController($location, $scope, $sessionStorage, $rootScope, LoginService, firebaseUrl, $firebaseArray) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'indexController';
        var ref = new Firebase(firebaseUrl);

        $rootScope.profileImage = 'assets/img/placeholder.png';

        vm.login = function (user) {
            //load users with
            vm.users = $firebaseArray(ref.child('User'));
            vm.users.$loaded(function (data) {
                for (var i = 0; i < vm.users.length; i++) {
                    if (vm.user.username == vm.users[i].username && vm.user.password == vm.users[i].password) {
                        $sessionStorage.isUserAuthenticated = true;
                        $sessionStorage.userId = vm.users[i].$id;
                        $sessionStorage.courseId = undefined;
                        $sessionStorage.displayName = vm.users[i].firstname + ' ' + vm.users[i].surname;
                        if (vm.users[i].userType == 'student') {
                            $sessionStorage.userType = 'student';
                            $sessionStorage.courseId = vm.users[i].courseId;
                        } else if (vm.users[i].userType == 'lecturer') {
                            $sessionStorage.userType = 'lecturer';
                        } else if (vm.users[i].userType == 'admin') {
                            $sessionStorage.userType = 'admin';
                        }
                        $location.path('/dashboard');
                        break;
                    } else {
                        vm.message = 'Incorrect username or password!!';
                    }
                }
            });           
        }
    }

    angular.module('EL').controller('LoginController', LoginController);
    LoginController.$inject = ['$location', '$scope', '$sessionStorage', '$rootScope', 'LoginService', 'firebaseUrl', '$firebaseArray'];
})();
