(function () {
    'use strict';

    function StudentReportController($location, $firebaseArray, HelperService, alertDialogService, modal, firebaseUrl) {
        /* jshint validthis:true */
        var vm = this;
        vm.heading = 'Student';
        vm.icon = "add_box";
        var ref = new Firebase(firebaseUrl);
        vm.pagenation = {
            limit: 5,
            page: 1,
        };

        init();

        function init() {
            //load students with class that is linked to
            vm.students = $firebaseArray(ref.child('Student'));
            vm.students.$loaded(function (data) {
                vm.classes = $firebaseArray(ref.child('Class'));
                vm.classes.$loaded(function (data) {
                    for (var i = 0; i < vm.students.length; i++) {
                        for (var j = 0; j < vm.classes.length; j++) {
                            if (vm.students[i].classId == vm.classes[j].$id) {
                                vm.students[i].class = vm.classes[j];
                                break;
                            }
                        }
                    }
                });
            });

        }

        vm.newStudent = function () {
            HelperService.assignCurrentRecord(undefined);
            $location.path('/studentReportAddEdit');
        }
        vm.editStudent = function (student) {
            HelperService.assignCurrentRecord(student);
            $location.path('/studentReportAddEdit');
        }
        vm.deleteStudent = function (student) {
            alertDialogService.setHeaderAndMessage('Delete', 'Are you sore you want to delete this class?');
            var templateUrl = '/app/common/alert/alertDialog.template.html';
            modal.show(templateUrl, 'alertDialogController').then(function (result) {
                if (result) {
                    vm.students.$remove(student);
                }
            });
        }
    }

    angular.module('EL').controller('StudentReportController', StudentReportController);
    StudentReportController.$inject = ['$location', '$firebaseArray', 'HelperService', 'alertDialogService', 'modal', 'firebaseUrl'];
})();
