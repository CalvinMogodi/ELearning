(function () {
    'use strict';

    function StudentReportAddEditController($location, firebaseUrl, HelperService, $firebaseArray, $filter, $firebaseObject) {
        /* jshint validthis:true */
        var vm = this;
        var ref = new Firebase(firebaseUrl);
        vm.heading = 'Link Student To Course';
        vm.selectedIndex = 0;

        init();
        function init() {
            vm.studentRecord = HelperService.getAssignedRecord();
            vm.courses = $firebaseArray(ref.child('Course'));
           
        }
        
        vm.link = function (record) {
            vm.formSubmitted = true;

            if (vm.studentForm.$valid) {
                var editRef = new Firebase(firebaseUrl + "/User/" + record.$id);
                var oldUser = $firebaseObject(editRef);

                oldUser.$id = record.$id;
                oldUser.firstname = record.firstname,
                oldUser.surname = record.surname,
                oldUser.userType = record.userType,
                oldUser.username = record.username,
                oldUser.password = record.password,
                oldUser.studentNumber = record.studentNumber,
                oldUser.courseId = record.course.$id,

                oldUser.$save();
                vm.linkSubjectsTab(record.course);
               
            }
        }

        vm.cancel = function () {
            $location.path('/studentsReport');
        }

        vm.backTab = function () {
            vm.selectedIndex = 0;
        }

        vm.linkSubjectsTab = function (course) {
            vm.subjectsToLink = [];
            vm.subjects = $firebaseArray(ref.child('Subject'));
            vm.subjects.$loaded(function (data) {
                for (var i = 0; i < vm.subjects.length; i++) {
                    if (vm.subjects[i].courseId == course.$id) {
                        vm.subjectsToLink.push(vm.subjects[i]);
                    }
                }
                vm.selectedIndex = 1;
            });
        }

        vm.linkSubjects = function (subjects) {
            for (var i = 0; i < subjects.length; i++) {
                if (subjects[i].isActive) {
                    var addRef = new Firebase(firebaseUrl + "/SubjectLink");
                    var subjectLinks = $firebaseArray(addRef);

                    var subjectLink =  {
                        subjectId: subjects[i].$id,
                        studentId: vm.studentRecord.$id,
                        courseId: vm.studentRecord.course.$id,
                        };

                    subjectLinks.$add(subjectLink);
                }                
            }
            $location.path('/studentsReport');
        }

    }

    angular.module('EL').controller('StudentReportAddEditController', StudentReportAddEditController);
    StudentReportAddEditController.$inject = ['$location', 'firebaseUrl', 'HelperService', '$firebaseArray', '$filter', '$firebaseObject'];
})();
