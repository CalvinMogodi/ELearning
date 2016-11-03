(function () {
    'use strict';

    function CourseAddEditController($location, firebaseUrl, HelperService, $firebaseArray, $filter, $firebaseObject) {
        /* jshint validthis:true */
        var vm = this;
        var ref = new Firebase(firebaseUrl);
        vm.isEdit = false;

        init();
        function init() {
            vm.course = HelperService.getAssignedRecord();
            vm.classes = $firebaseArray(ref.child('Course'));
            vm.heading = 'Add New Course';
            if (vm.course) {
                vm.isEdit = true;
                vm.heading = 'Update Course';
                vm.course.class = vm.course.class;
                if (vm.course) {
                    vm.course.startDate = new Date(vm.course.startDate);
                    vm.course.endDate = new Date(vm.course.endDate);
                }
            }

        }

        vm.create = function (course) {

            vm.formSubmitted = true;

            if (vm.courseForm.$valid) {
                var addRef = new Firebase(firebaseUrl + "/Course");
                var events = $firebaseArray(addRef);

                course.startDate = $filter('date')(new Date(course.startDate), 'yyyy-MM-dd');
                course.endDate = $filter('date')(new Date(course.endDate), 'yyyy-MM-dd');
                var newRecord = {
                    title: course.title,
                    description: course.description,
                    startDate: course.startDate,
                    endDate: course.endDate,
                };
                events.$add(newRecord);
                $location.path('/course');
            }
        }

        vm.update = function (course) {
            vm.formSubmitted = true;

            if (vm.courseForm.$valid) {
                var editRef = new Firebase(firebaseUrl + "/Course/" + course.$id);
                course.startDate = $filter('date')(new Date(course.startDate), 'yyyy-MM-dd');
                course.endDate = $filter('date')(new Date(course.endDate), 'yyyy-MM-dd');
                var oldCourse = $firebaseObject(editRef);

                oldCourse.$id = course.$id;
                oldCourse.description = course.description;
                oldCourse.title = course.title;
                oldCourse.startDate = course.startDate;
                oldCourse.endDate = course.endDate;

                oldCourse.$save();
                $location.path('/course');
            }
        }

        vm.cancel = function () {
            $location.path('/course');
        }
    }

        angular.module('EL').controller('CourseAddEditController', CourseAddEditController);
        CourseAddEditController.$inject = ['$location', 'firebaseUrl', 'HelperService', '$firebaseArray', '$filter', '$firebaseObject'];
})();
