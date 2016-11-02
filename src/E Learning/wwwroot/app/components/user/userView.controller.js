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
            alertDialogService.setHeaderAndMessage('Delete', 'Are you sore you want to delete this user?');
            var templateUrl = '/app/common/alert/alertDialog.template.html';
            modal.show(templateUrl, 'alertDialogController').then(function (result) {
                if (result) {
                    vm.users.$remove(user);
                }
            });
        }
    }

    angular.module('EL').controller('UserController', UserController);
    UserController.$inject = ['$location', '$firebaseArray', 'HelperService', 'alertDialogService', 'modal', 'firebaseUrl'];
})();
