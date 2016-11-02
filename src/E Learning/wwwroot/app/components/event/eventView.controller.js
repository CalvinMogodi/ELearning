﻿(function () {
    'use strict'; 

    function EventController($location, $firebaseArray, HelperService, alertDialogService, modal, firebaseUrl) {
        /* jshint validthis:true */
        var vm = this;
        vm.heading = 'Event';
        vm.icon = "add_box";
        var ref = new Firebase(firebaseUrl);
        vm.pagenation = {
            limit: 5,
            page: 1,
        };

        init();

        function init() {
            //load annoucements with class that is linked to
            vm.events = $firebaseArray(ref.child('Event'));
            vm.events.$loaded(function (data) {
                vm.classes = $firebaseArray(ref.child('Class'));
                vm.classes.$loaded(function (data) {                   
                    for (var i = 0; i < vm.events.length; i++) {
                        for (var j = 0; j < vm.classes.length; j++) {
                            if (vm.events[i].classId == vm.classes[j].$id) {
                                vm.events[i].class = vm.classes[j];
                                break;
                            }
                        }
                    }
                });
            });
            
        }

        vm.newEvent = function () {
            HelperService.assignCurrentRecord(undefined);
            $location.path('/eventAddEdit');
        }
        vm.editEvent = function (event) {
            HelperService.assignCurrentRecord(event);
            $location.path('/eventAddEdit');
        }
        vm.deleteEvent = function (event) {
            alertDialogService.setHeaderAndMessage('Delete', 'Are you sore you want to delete this class?');
            var templateUrl = '/app/common/alert/alertDialog.template.html';
            modal.show(templateUrl, 'alertDialogController').then(function (result) {
                if (result) {
                    vm.events.$remove(event);
                }
            });
        }
    }

    angular.module('EL').controller('EventController', EventController);
    EventController.$inject = ['$location', '$firebaseArray', 'HelperService', 'alertDialogService', 'modal', 'firebaseUrl'];
})();
