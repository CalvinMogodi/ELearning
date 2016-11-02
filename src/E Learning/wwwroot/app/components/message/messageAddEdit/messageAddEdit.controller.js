(function () {
    'use strict';

    function MessageAddEditController($location, $firebaseArray, HelperService, alertDialogService, modal, $filter, firebaseUrl, $sessionStorage) {
        /* jshint validthis:true */
        var vm = this;
        vm.heading = 'Send New Message';
        vm.isReadOnly = false;
        var ref = new Firebase(firebaseUrl);
        vm.tabs = [
            { id: 1, heading: 'Inbox', active: false, url: '/message' },
            { id: 2, heading: 'Sent Message', active: false, url: '' },
            { id: 3, heading: 'Send New Message', active: true, url: '/messageAddEdit' }
        ]

        init();
        function init() {
            vm.users = $firebaseArray(ref.child('User'));
            vm.message = HelperService.getAssignedRecord();
            if (vm.message) {
                vm.isReadOnly = true;
            }
        }

        vm.getUsersByType = function (userType) {
            var newUsers = angular.copy(vm.users);
            vm.listOfUsers = [];
            for (var i = 0; i < newUsers.length; i++) {
                if (newUsers[i].userType == userType) {
                    vm.listOfUsers.push(newUsers[i]);
                }
            }
        }

        vm.sendMessage = function (message) {
            vm.formSubmitted = true;

            if (vm.messageForm.$valid) {

                var obj = JSON.parse(message.user);
                var addRef = new Firebase(firebaseUrl + "/Message");
                var messages = $firebaseArray(addRef);
                message.date = $filter('date')(new Date(), 'yyyy-MM-dd');

                var newRecord = {
                    sendTo: message.sendTo,
                    userId: obj.$id,
                    subject: message.subject,
                    message: message.message,
                    senderId: $sessionStorage.userId,
                    createdDate: message.date,
                    status: 'new',
                };
                messages.$add(newRecord);
                $location.path('/message');
            }
        }

        vm.cancel = function () {
            $location.path('/message');
        }
    }

    angular.module('EL').controller('MessageAddEditController', MessageAddEditController);
    MessageAddEditController.$inject = ['$location', '$firebaseArray', 'HelperService', 'alertDialogService', 'modal', '$filter', 'firebaseUrl', '$sessionStorage'];
})();
