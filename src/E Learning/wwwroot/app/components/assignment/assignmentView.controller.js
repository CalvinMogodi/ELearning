﻿(function () {
    'use strict';

    function AssignmentController($location, $firebaseArray, HelperService, alertDialogService, modal, firebaseUrl) {
        /* jshint validthis:true */
        var vm = this;
        vm.heading = 'Assignment';
        vm.icon = "add_box";
        var ref = new Firebase(firebaseUrl);
        vm.pagenation = {
            limit: 5,
            page: 1,
        };

        init();

        function init() {
            //load assignments with class that is linked to
            vm.assignments = $firebaseArray(ref.child('Assignment'));
            vm.assignments.$loaded(function (data) {
                vm.classes = $firebaseArray(ref.child('Class'));
                vm.classes.$loaded(function (data) {
                    for (var i = 0; i < vm.assignments.length; i++) {
                        for (var j = 0; j < vm.classes.length; j++) {
                            if (vm.assignments[i].classId == vm.classes[j].$id) {
                                vm.assignments[i].class = vm.classes[j];
                                break;
                            }
                        }
                    }
                });
            });

        }

        vm.newAssignment = function () {
            HelperService.assignCurrentRecord(undefined);
            $location.path('/assignmentAddEdit');
        }
        vm.editAssignment = function (assignment) {
            HelperService.assignCurrentRecord(assignment);
            $location.path('/assignmentAddEdit');
        }

        vm.downloadAssignment = function (assignment) {
            //TODO
            var xhr = new XMLHttpRequest();
            xhr.open("GET", assignment.file);
            xhr.responseType = "arraybuffer";

            xhr.onload = function () {
                if (this.status === 200) {
                    var blob = new Blob([xhr.response], { type: "application/pdf" });
                    var objectUrl = URL.createObjectURL(blob);
                    //objectUrl = objectUrl.substring(0, objectUrl.lastIndexOf('/'));
                    //objectUrl = objectUrl + '/'+assignment.fileName;
                    window.open(objectUrl);
                }
            };
            xhr.send();
        }

        vm.deleteAssignment = function (assignment) {
            alertDialogService.setHeaderAndMessage('Delete', 'Are you sore you want to delete this class?');
            var templateUrl = '/app/common/alert/alertDialog.template.html';
            modal.show(templateUrl, 'alertDialogController').then(function (result) {
                if (result) {
                    vm.assignments.$remove(assignment);
                }
            });
        }
    }

    angular.module('EL').controller('AssignmentController', AssignmentController);
    AssignmentController.$inject = ['$location', '$firebaseArray', 'HelperService', 'alertDialogService', 'modal', 'firebaseUrl'];
})();
