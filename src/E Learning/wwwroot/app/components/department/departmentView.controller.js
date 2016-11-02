(function () {
    'use strict';

    function DepartmentController($location, $firebaseArray, HelperService, alertDialogService, modal, firebaseUrl) {
        /* jshint validthis:true */
        var vm = this;
        vm.heading = 'Department';
        vm.icon = "add_box";
        var ref = new Firebase(firebaseUrl);
        vm.pagenation = {
            limit: 5,
            page: 1,
        };

        init();

        function init() {
            //load departments with class that is linked to
            vm.departments = $firebaseArray(ref.child('Department'));
        }

        vm.newDepartment = function () {
            HelperService.assignCurrentRecord(undefined);
            $location.path('/departmentAddEdit');
        }
        vm.editDepartment = function (department) {
            HelperService.assignCurrentRecord(department);
            $location.path('/departmentAddEdit');
        }
        vm.deleteDepartment = function (department) {
            alertDialogService.setHeaderAndMessage('Delete', 'Are you sore you want to delete this department?');
            var templateUrl = '/app/common/alert/alertDialog.template.html';
            modal.show(templateUrl, 'alertDialogController').then(function (result) {
                if (result) {
                    vm.departments.$remove(department);
                }
            });
        }
    }

    angular.module('EL').controller('DepartmentController', DepartmentController);
    DepartmentController.$inject = ['$location', '$firebaseArray', 'HelperService', 'alertDialogService', 'modal', 'firebaseUrl'];
})();
