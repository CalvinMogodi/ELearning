(function () {
    'use strict';

    function MessageAddEditController($location, $firebaseArray, HelperService, alertDialogService, modal, $filter, firebaseUrl, $sessionStorage) {
        /* jshint validthis:true */
        var vm = this;
        vm.isReadOnly = false;
        var ref = new Firebase(firebaseUrl);
        vm.tabs = [
            { id: 1, heading: 'Inbox', active: false, url: 'message' },
            { id: 2, heading: 'Sent Message', active: false, url: 'sentMessage' },
            
        ]
        vm.heading = 'Send New Message';

        init();
        function init() {
            vm.users = $firebaseArray(ref.child('User'));
            vm.message = HelperService.getAssignedRecord();
            if (vm.message) {
                vm.isReadOnly = true;
                vm.heading = 'View Message';
                vm.tabs.push({ id: 3, heading: 'View Message', active: true, url: '/messageAddEdit' });
            }
            else {
                vm.tabs.push({ id: 3, heading: 'Send New Message', active: true, url: '/messageAddEdit' });
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

                var addRef = new Firebase(firebaseUrl + "/Message");
                var messages = $firebaseArray(addRef);
                message.date = $filter('date')(new Date(), 'yyyy-MM-dd');

                var newRecord = {
                    sendTo: message.sendTo,
                    userId: message.user.$id,
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
            HelperService.assignCurrentRecord(undefined);
            $location.path('/message');
        }

        vm.tabClickedFunction = function (tab) {
            $location.path(tab.url);
        }
    }

    angular.module('EL').controller('MessageAddEditController', MessageAddEditController);
    MessageAddEditController.$inject = ['$location', '$firebaseArray', 'HelperService', 'alertDialogService', 'modal', '$filter', 'firebaseUrl', '$sessionStorage'];
})();
