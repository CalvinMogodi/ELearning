(function () {
    'use strict';

    function UserAddEditController($location, firebaseUrl, HelperService, $firebaseArray,  $firebaseObject) {
        /* jshint validthis:true */
        var vm = this;
        var ref = new Firebase(firebaseUrl);
        vm.isEdit = false;

        init();
        function init() {
            vm.user = HelperService.getAssignedRecord();
            vm.heading = 'Add New User';
            if (vm.user) {
                vm.isEdit = true;
                vm.heading = 'Update User';
                vm.user.confirmPassword = vm.user.password;
            }

        }

        vm.create = function (user) {

            vm.formSubmitted = true;

            if (vm.userForm.$valid) {

                var addRef = new Firebase(firebaseUrl + "/User");
                var users = $firebaseArray(addRef);

                var newRecord = {
                    firstname: user.firstname,
                    surname: user.surname,
                    userType: user.userType,
                    username: user.username,
                    password: user.password,
                };
                if (newRecord.userType == 'student') {
                    newRecord.studentNumber = HelperService.getRandomizeId();
                }
                users.$add(newRecord);
                $location.path('/user');
            }
        }

        vm.update = function (user) {
            vm.formSubmitted = true;

            if (vm.userForm.$valid) {

                var editRef = new Firebase(firebaseUrl + "/User/" + user.$id);
                var oldUser = $firebaseObject(editRef);

                oldUser.$id = user.$id;
                oldUser.firstname = user.firstname;
                oldUser.surname = user.surname;
                oldUser.userType = user.userType;
                oldUser.username = user.username;
                oldUser.password = user.password;

                if (oldUser.userType == 'student') {
                    if (oldUser.studentNumber == undefined) {
                        oldUser.studentNumber = HelperService.getRandomizeId();
                    }
                }

                oldUser.$save();
                $location.path('/user');
            }
        }

        vm.cancel = function () {
            $location.path('/user');
        }
    }

    angular.module('EL').controller('UserAddEditController', UserAddEditController);
    UserAddEditController.$inject = ['$location', 'firebaseUrl', 'HelperService', '$firebaseArray','$firebaseObject'];
})();
