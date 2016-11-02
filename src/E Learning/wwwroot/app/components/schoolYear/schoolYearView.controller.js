(function () {
    'use strict';

    function SchoolYearController($location, $firebaseArray, HelperService, alertDialogService, modal, firebaseUrl) {
        /* jshint validthis:true */
        var vm = this;
        vm.heading = 'School Year';
        vm.icon = "add_box";
        var ref = new Firebase(firebaseUrl);
        vm.pagenation = {
            limit: 5,
            page: 1,
        };

        init();

        function init() {
            //load schoolYears with class that is linked to
            vm.schoolYears = $firebaseArray(ref.child('SchoolYear'));
        }

        vm.newSchoolYear = function () {
            HelperService.assignCurrentRecord(undefined);
            $location.path('/schoolYearAddEdit');
        }
        vm.editSchoolYear = function (schoolYear) {
            HelperService.assignCurrentRecord(schoolYear);
            $location.path('/schoolYearAddEdit');
        }
        vm.deleteSchoolYear = function (schoolYear) {
            alertDialogService.setHeaderAndMessage('Delete', 'Are you sore you want to delete this school year?');
            var templateUrl = '/app/common/alert/alertDialog.template.html';
            modal.show(templateUrl, 'alertDialogController').then(function (result) {
                if (result) {
                    vm.schoolYears.$remove(schoolYear);
                }
            });
        }
    }

    angular.module('EL').controller('SchoolYearController', SchoolYearController);
    SchoolYearController.$inject = ['$location', '$firebaseArray', 'HelperService', 'alertDialogService', 'modal', 'firebaseUrl'];
})();
