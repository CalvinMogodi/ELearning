(function () {
    'use strict';

    function UserController($location, $firebaseArray, HelperService, alertDialogService, modal, firebaseUrl) {
        /* jshint validthis:true */
        var vm = this;
        vm.heading = 'user';
        vm.icon = "add_box";
        var ref = new Firebase(firebaseUrl);
        vm.pagenation = {
            limit: 5,
            page: 1,
        };

        init();

        function init() {
            //load users with
            vm.users = $firebaseArray(ref.child('User'));
            vm.users.$loaded(function (data) {
                vm.masterUsers = angular.copy(vm.users);
            });
        }

        vm.newUser = function () {
            HelperService.assignCurrentRecord(undefined);
            $location.path('/userAddEdit');
        }
        vm.editUser = function (user) {
            HelperService.assignCurrentRecord(user);
            $location.path('/userAddEdit');
        }
        vm.deleteUser = function (user) {
            alertDialogService.setHeaderAndMessage('Delete', 'Are you sure you want to delete this user?');
            var templateUrl = '/app/common/alert/alertDialog.template.html';
            modal.show(templateUrl, 'alertDialogController').then(function (result) {
                if (result) {
                    vm.users.$remove(user);
                }
            });
        }
        vm.filter = function (filter) {
            var list = angular.copy(vm.masterUsers);
            var results = [];
            if (filter.userType){
                for (var i = 0; i < list.length; i++) {
                    if (filter.userType.toLowerCase() == list[i].userType.toLowerCase()) {
                        results.push(list[i]);
                    }
                }
            }
            vm.users = results;
        }
        vm.clear = function () {
            vm.filter.userType = undefined;
            vm.users = angular.copy(vm.masterUsers);
        }
    }

    angular.module('EL').controller('UserController', UserController);
    UserController.$inject = ['$location', '$firebaseArray', 'HelperService', 'alertDialogService', 'modal', 'firebaseUrl'];
})();
