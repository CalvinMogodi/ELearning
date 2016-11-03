(function () {
    'use strict';

    function SubjectController($location, $firebaseArray, HelperService, alertDialogService, modal, firebaseUrl, $sessionStorage) {
        /* jshint validthis:true */
        var vm = this;
        vm.heading = 'Subject';
        vm.icon = "add_box";
        vm.isStudent = false;
        vm.showAddButton = true;
        var ref = new Firebase(firebaseUrl);
        vm.pagenation = {
            limit: 5,
            page: 1,
        };

        init();

        function init() {
            if ($sessionStorage.userType == 'student') {
                vm.showAddButton = false;
                vm.isStudent = true;
                vm.subjects = [];
                vm.allSubjects = $firebaseArray(ref.child('Subject'));
                vm.allSubjects.$loaded(function (data) {
                    vm.course = $firebaseArray(ref.child('Course'));
                    vm.course.$loaded(function (data) {
                        for (var j = 0; j < vm.course.length; j++) {
                            if (vm.course[j].$id == $sessionStorage.courseId) {
                                for (var i = 0; i < vm.allSubjects.length; i++) {
                                    if (vm.allSubjects[i].courseId == vm.course[j].$id) {
                                        vm.allSubjects[i].course = vm.course[j];
                                        vm.subjects.push(vm.allSubjects[i]);
                                    }
                                }
                                break;
                            }
                            
                        }
                    });
                });
            } else {
                //load subjects with course that is linked to
                vm.subjects = $firebaseArray(ref.child('Subject'));
                vm.subjects.$loaded(function (data) {
                    vm.course = $firebaseArray(ref.child('Course'));
                    vm.course.$loaded(function (data) {
                        for (var i = 0; i < vm.subjects.length; i++) {
                            for (var j = 0; j < vm.course.length; j++) {
                                if (vm.subjects[i].courseId == vm.course[j].$id) {
                                    vm.subjects[i].course = vm.course[j];
                                    break;
                                }
                            }
                        }
                    });
                });
            }
        }

        vm.newSubject = function () {
            HelperService.assignCurrentRecord(undefined);
            $location.path('/subjectAddEdit');
        }
        vm.editSubject = function (subject) {
            HelperService.assignCurrentRecord(subject);
            $location.path('/subjectAddEdit');
        }
        vm.deleteSubjest = function (subject) {
            alertDialogService.setHeaderAndMessage('Delete', 'Are you sore you want to delete this subject?');
            var templateUrl = '/app/common/alert/alertDialog.template.html';
            modal.show(templateUrl, 'alertDialogController').then(function (result) {
                if (result) {
                    vm.subjects.$remove(subject);
                }
            });
        }
    }

    angular.module('EL').controller('SubjectController', SubjectController);
    SubjectController.$inject = ['$location', '$firebaseArray', 'HelperService', 'alertDialogService', 'modal', 'firebaseUrl', '$sessionStorage'];
})();
