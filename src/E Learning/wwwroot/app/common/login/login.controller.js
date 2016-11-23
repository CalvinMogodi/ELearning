(function () {
    'use strict';

    function LoginController($location, $scope, $sessionStorage, $rootScope, LoginService, UserFactory) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'indexController';
        vm.selectedIndex = 0;
        $rootScope.profileImage = 'assets/img/placeholder.png';

        vm.login = function () {
            UserFactory.loginUser(vm.user.username, vm.user.password).then(function (results){
                if (results != undefined) {
                    $sessionStorage.isUserAuthenticated = true;
                    $sessionStorage.userId = results.id;
                    $sessionStorage.courseId = results.courseId;
                        
                    $sessionStorage.displayName = results.firstname + ' ' + results.surname;
                    if (results.userType == 'student') {
                        $sessionStorage.userType = 'student';                     
                    } else if (results.userType == 'lecturer') {
                        $sessionStorage.userType = 'lecturer';
                    } else if (results.userType == 'admin') {
                        $sessionStorage.userType = 'admin';
                    }
                    $location.path('/dashboard');
                    
                } else {
                    vm.message = 'Incorrect username or password!!';
                }
            });
           
        }

        vm.nextTab = function () {
            vm.users = $firebaseArray(ref.child('User'));
            vm.users.$loaded(function (data) {
                for (var i = 0; i < vm.users.length; i++) {
                    if (vm.user.username == vm.users[i].username) {
                        vm.selectedIndex = 1;
                        vm.fpMessage = undefined;
                        vm.thisUser = vm.users[i];
                        break;
                    } else {
                        vm.message = 'Incorrect username!!';
                    }
                }
            });
           
        }

        vm.backTab = function () {
            vm.selectedIndex = 0;
        }

        vm.changePassword = function () {
            if (vm.user.newPassword == vm.user.confirmNewPassword) {
                
                var editRef = new Firebase(firebaseUrl + "/User/" + vm.thisUser.$id);
                var oldUser = $firebaseObject(editRef);

                oldUser.$id = vm.thisUser.$id;
                oldUser.firstname = vm.thisUser.firstname,
                oldUser.surname = vm.thisUser.surname,
                oldUser.userType = vm.thisUser.userType,
                oldUser.username = vm.thisUser.username,
                oldUser.password = vm.user.newPassword,

                oldUser.$save();
                vm.message = undefined;
                vm.selectedIndex = 0;

            } else {
                vm.fpMessage = 'Your passwords does not match!!';
            }
        }
    }

    angular.module('EL').controller('LoginController', LoginController);
    LoginController.$inject = ['$location', '$scope', '$sessionStorage', '$rootScope', 'LoginService', 'UserFactory'];
})();
