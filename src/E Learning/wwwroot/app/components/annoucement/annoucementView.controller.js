(function () {
    'use strict';

    function AnnoucementController($location, $firebaseArray, HelperService, alertDialogService, modal, firebaseUrl) {
        /* jshint validthis:true */
        var vm = this;
        vm.heading = 'Annoucement';
        vm.icon = "add_box";
        var ref = new Firebase(firebaseUrl);
        vm.pagenation = {
            limit: 5,
            page: 1,
        };

        init();

        function init() {
            //load annoucements with class that is linked to
            vm.annoucements = $firebaseArray(ref.child('Annoucement'));
            vm.annoucements.$loaded(function (data) {
                vm.subjects = $firebaseArray(ref.child('Subject'));
                vm.subjects.$loaded(function (data) {
                    for (var i = 0; i < vm.annoucements.length; i++) {
                        for (var j = 0; j < vm.subjects.length; j++) {
                            if (vm.annoucements[i].subjectId == vm.subjects[j].$id) {
                                vm.annoucements[i].subject = vm.subjects[j];
                                break;
                            }
                        }
                    }
                });
            });
            
        }

        vm.newAnnoucement = function () {
            HelperService.assignCurrentRecord(undefined);
            $location.path('/annoucementAddEdit');
        }
        vm.editAnnoucement = function (annoucement) {
            HelperService.assignCurrentRecord(annoucement);
            $location.path('/annoucementAddEdit');
        }
        vm.deleteAnnoucement = function (annoucement) {
            alertDialogService.setHeaderAndMessage('Delete', 'Are you sure you want to delete this class?');
            var templateUrl = '/app/common/alert/alertDialog.template.html';
            modal.show(templateUrl, 'alertDialogController').then(function (result) {
                if (result) {
                    vm.annoucements.$remove(annoucement);
                }
            });
        }
    }

    angular.module('EL').controller('AnnoucementController', AnnoucementController);
    AnnoucementController.$inject = ['$location', '$firebaseArray', 'HelperService', 'alertDialogService', 'modal', 'firebaseUrl'];
})();
