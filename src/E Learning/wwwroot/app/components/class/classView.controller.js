(function () {
    'use strict';

    function ClassController($location, firebaseUrl, $firebaseArray, HelperService, alertDialogService, modal) {
        /* jshint validthis:true */
        var vm = this;
        vm.heading = 'Class';
        vm.icon = "add_box";
        var ref = new Firebase(firebaseUrl);
        vm.pagenation = {
            limit: 5,
            page:1,
        };

        init();

        function init() {
            vm.classes = $firebaseArray(ref.child('Class'));
        }

        vm.newClass = function () {
            HelperService.assignCurrentRecord(undefined);
            $location.path('/classAddEdit');
        }
        vm.editClass = function (classOjb) {
            HelperService.assignCurrentRecord(classOjb);
            $location.path('/classAddEdit');
        }
        vm.deleteClass = function (classOjb) {
            alertDialogService.setHeaderAndMessage('Delete', 'Are you sore you want to delete this class?');
            var templateUrl = '/app/common/alert/alertDialog.template.html';
            modal.show(templateUrl, 'alertDialogController').then(function (result) {
                if (result) {
                    vm.classes.$remove(classOjb);
                }
            });
        }
    }

    angular.module('EL').controller('ClassController', ClassController);
    ClassController.$inject = ['$location', 'firebaseUrl', '$firebaseArray', 'HelperService', 'alertDialogService', 'modal'];
})();
