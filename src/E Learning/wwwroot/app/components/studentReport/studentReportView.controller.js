(function () {
    'use strict';

    function StudentReportController($location, $firebaseArray, HelperService, alertDialogService, modal, firebaseUrl) {
        /* jshint validthis:true */
        var vm = this;
        vm.heading = 'Student';
        vm.icon = "add_box";
        vm.students = [];
        var ref = new Firebase(firebaseUrl);
        vm.pagenation = {
            limit: 5,
            page: 1,
        };

        init();

        function init() {
            //load students with class that is linked to
            vm.users = $firebaseArray(ref.child('User'));
            vm.users.$loaded(function (data) {
                vm.courses = $firebaseArray(ref.child('Course'));
                vm.courses.$loaded(function (data) {
                    for (var i = 0; i < vm.users.length; i++) {
                        if (vm.users[i].userType == 'student') {
                            if (vm.users[i].courseId) {
                            for (var j = 0; j < vm.courses.length; j++) {                                
                                if (vm.users[i].courseId == vm.courses[j].$id) {
                                    vm.users[i].course = vm.courses[j];
                                    vm.students.push(vm.users[i]);
                                    break;
                                }             
                            }
                            } else {
                                vm.students.push(vm.users[i]);
                            }
                        }                        
                    }
                });
            });

        }

        vm.editStudentRecord = function () {
            HelperService.assignCurrentRecord(undefined);
            $location.path('/studentAddEdit');
        }
        vm.addCourse = function (course) {
            HelperService.assignCurrentRecord(course);
            $location.path('/studentAddEdit');
        }

        vm.newStudent = function () {
            $location.path('/userAddEdit');
        }
    }

    angular.module('EL').controller('StudentReportController', StudentReportController);
    StudentReportController.$inject = ['$location', '$firebaseArray', 'HelperService', 'alertDialogService', 'modal', 'firebaseUrl'];
})();
