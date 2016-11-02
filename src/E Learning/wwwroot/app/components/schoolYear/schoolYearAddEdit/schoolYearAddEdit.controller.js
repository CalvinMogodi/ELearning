(function () {
    'use strict';

    function SchoolYearAddEditController($location, firebaseUrl, HelperService, $firebaseArray, $filter, $firebaseObject) {
        /* jshint validthis:true */
        var vm = this;
        var ref = new Firebase(firebaseUrl);
        vm.isEdit = false;

        init();
        function init() {
            vm.schoolYear = HelperService.getAssignedRecord();
            vm.heading = 'Add New School Year';
            if (vm.schoolYear) {
                vm.isEdit = true;
                vm.heading = 'Update School Year';
            }

        }

        vm.create = function (schoolYear) {

            vm.formSubmitted = true;

            if (vm.schoolYearForm.$valid) {

                var schoolYearRef = new Firebase(firebaseUrl + "/SchoolYear");
                var schoolYears = $firebaseArray(schoolYearRef);

                var newRecord = {
                    title: schoolYear.title,
                    description: schoolYear.description,
                };
                schoolYears.$add(newRecord);
                $location.path('/schoolYear');
            }
        }

        vm.update = function (schoolYear) {
            vm.formSubmitted = true;

            if (vm.schoolYearForm.$valid) {

                var editRef = new Firebase(firebaseUrl + "/SchoolYear/" + schoolYear.$id);
                var oldSchoolYear = $firebaseObject(editRef);

                oldSchoolYear.$id = schoolYear.$id;
                oldSchoolYear.description = schoolYear.description;
                oldSchoolYear.title = schoolYear.title;

                oldSchoolYear.$save();
                $location.path('/schoolYear');
            }
        }

        vm.cancel = function () {
            $location.path('/schoolYear');
        }
    }

    angular.module('EL').controller('SchoolYearAddEditController', SchoolYearAddEditController);
    SchoolYearAddEditController.$inject = ['$location', 'firebaseUrl', 'HelperService', '$firebaseArray', '$filter', '$firebaseObject'];
})();
