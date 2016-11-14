(function () {
    'use strict';

    function CourseController($location, $firebaseArray, HelperService, alertDialogService, modal, firebaseUrl) {
        /* jshint validthis:true */
        var vm = this;
        vm.heading = 'Course';
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
            //load annoucements with class that is linked to
            vm.courses = $firebaseArray(ref.child('Course'));
        }

        vm.newCourse = function () {
            HelperService.assignCurrentRecord(undefined);
            $location.path('/courseAddEdit');
        }
        vm.editCourse = function (course) {
            HelperService.assignCurrentRecord(course);
            $location.path('/courseAddEdit');
        }
        vm.deleteCourse = function (course) {
            alertDialogService.setHeaderAndMessage('Delete', 'Are you sure you want to delete this course?');
            var templateUrl = '/app/common/alert/alertDialog.template.html';
            modal.show(templateUrl, 'alertDialogController').then(function (result) {
                if (result) {
                    vm.courses.$remove(course);
                }
            });
        }

        vm.viewSubjects = function (course) {
            HelperService.assignCurrentRecord(course);
            $location.path('/subject');
        }
    }

    angular.module('EL').controller('CourseController', CourseController);
    CourseController.$inject = ['$location', '$firebaseArray', 'HelperService', 'alertDialogService', 'modal', 'firebaseUrl'];
})();
