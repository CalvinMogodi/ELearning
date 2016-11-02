(function () {
    'use strict';

    function DepartmentAddEditController($location, firebaseUrl, HelperService, $firebaseArray, $filter, $firebaseObject) {
        /* jshint validthis:true */
        var vm = this;
        var ref = new Firebase(firebaseUrl);
        vm.isEdit = false;

        init();
        function init() {
            vm.department = HelperService.getAssignedRecord();
            vm.heading = 'Add New Department';
            if (vm.department) {
                vm.isEdit = true;
                vm.heading = 'Update Department';                
            }

        }

        vm.create = function (department) {

            vm.formSubmitted = true;

            if (vm.departmentForm.$valid) {

                var departmentRef = new Firebase(firebaseUrl + "/Department");
                var departments = $firebaseArray(departmentRef);

                var newRecord = {
                    code: department.code,
                    title: department.title,
                    description: department.description,
                };
                departments.$add(newRecord);
                $location.path('/department');
            }
        }

        vm.update = function (department) {
            vm.formSubmitted = true;

            if (vm.departmentForm.$valid) {

                var editRef = new Firebase(firebaseUrl + "/Department/" + department.$id);
                var oldDepartments = $firebaseObject(editRef);

                oldDepartments.$id = department.$id;
                oldDepartments.description = department.description;
                oldDepartments.title = department.title;
                oldDepartments.code = department.code,

                oldDepartments.$save();
                $location.path('/department');
            }
        }

        vm.cancel = function () {
            $location.path('/department');
        }
    }

    angular.module('EL').controller('DepartmentAddEditController', DepartmentAddEditController);
    DepartmentAddEditController.$inject = ['$location', 'firebaseUrl', 'HelperService', '$firebaseArray', '$filter', '$firebaseObject'];
})();
