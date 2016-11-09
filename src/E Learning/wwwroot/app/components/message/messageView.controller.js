(function () {
    'use strict';

    function MessageController($location, firebaseUrl, HelperService, $firebaseArray, $filter, $firebaseObject, $sessionStorage) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'MessageController';
        var ref = new Firebase(firebaseUrl);
        vm.inboxmessages = [];
        vm.tabs = [
            { id: 1, heading: 'Inbox', active: true, url: 'message' },
            { id: 2, heading: 'Sent Message', active: false, url: 'sentMessage' },
            { id: 3, heading: 'Send New Message', active: false, url: '/messageAddEdit' }
        ]

        init();
        function init() {
            vm.messages = $firebaseArray(ref.child('Message'));
            vm.messages.$loaded(function (data) {                
                vm.users = $firebaseArray(ref.child('User'));
                vm.users.$loaded(function (data) {                   
                    for (var i = 0; i < vm.messages.length; i++) {
                        if (vm.messages[i].userId == $sessionStorage.userId) {
                            for (var j = 0; j < vm.users.length; j++) {
                                if (vm.messages[i].senderId == vm.users[j].$id) {
                                    vm.messages[i].sender = vm.users[j];
                                    //break;
                                }
                                if (vm.messages[i].userId == vm.users[j].$id) {
                                    vm.messages[i].user = vm.users[j];
                                    //break;
                                }                                
                            }
                            vm.inboxmessages.push(vm.messages[i]);
                        }
                    }
                });
                
            });
        }

        vm.newMessage = function () {
            HelperService.assignCurrentRecord(undefined);
            $location.path('/messageAddEdit');
        }

        vm.viewMessage = function (message) {
            message.isFromSent = false;
            HelperService.assignCurrentRecord(message);
            $location.path('/messageAddEdit');
        }

        vm.tabClickedFunction = function (tab) {
            $location.path(tab.url);
        }
    }

    angular.module('EL').controller('MessageController', MessageController);
    MessageController.$inject = ['$location', 'firebaseUrl', 'HelperService', '$firebaseArray', '$filter', '$firebaseObject', '$sessionStorage'];
})();
