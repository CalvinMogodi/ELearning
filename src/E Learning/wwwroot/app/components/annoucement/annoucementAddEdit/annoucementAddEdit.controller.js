(function () {
    'use strict';

    function AnnoucementAddEditController($location, firebaseUrl, HelperService, $firebaseArray, $filter, $firebaseObject, $sessionStorage) {
        /* jshint validthis:true */
        var vm = this;
        var ref = new Firebase(firebaseUrl);
        vm.isEdit = false;

        init();
        function init() {
            vm.annoucement = HelperService.getAssignedRecord();
            vm.subjects = $firebaseArray(ref.child('Subject'));
            vm.heading = 'Add New Annoucement';
            if (vm.annoucement) {
                vm.isEdit = true;
                vm.heading = 'Update Annoucement';
                vm.annoucement.class = vm.annoucement.class;
                if (vm.annoucement)
                    vm.annoucement.date = new Date(vm.annoucement.date);
            }

        }

        vm.create = function (annoucement) {

            vm.formSubmitted = true;

            if (vm.annoucementForm.$valid) {
                var annoucementRef = new Firebase(firebaseUrl + "/Annoucement");
                var annoucements = $firebaseArray(annoucementRef);

                annoucement.date = $filter('date')(new Date(annoucement.date), 'yyyy-MM-dd');
                var newRecord = {
                    title: annoucement.title,
                    description: annoucement.description,
                    date: annoucement.date,
                    subjectId: annoucement.subject.$id,
                    lecturerId: $sessionStorage.userId,
                };
                annoucements.$add(newRecord);
                $location.path('/annoucement');
            }
        }

        vm.update = function (annoucement) {
            vm.formSubmitted = true;

            if (vm.annoucementForm.$valid) {
                var editRef = new Firebase(firebaseUrl + "/Annoucement/" + annoucement.$id);
                annoucement.date = $filter('date')(new Date(annoucement.date), 'yyyy-MM-dd');
                var oldAnnoucement = $firebaseObject(editRef);

                oldAnnoucement.$id = annoucement.$id;
                oldAnnoucement.description = annoucement.description;
                oldAnnoucement.title = annoucement.title;
                oldAnnoucement.date = annoucement.date;
                oldAnnoucement.subjectId = annoucement.subject.$id;
                oldAnnoucement.lecturerId = $sessionStorage.userId;

                oldAnnoucement.$save();
                $location.path('/annoucement');
            }
        }

        vm.cancel = function () {
            $location.path('/annoucement');
        }
    }

    angular.module('EL').controller('AnnoucementAddEditController', AnnoucementAddEditController);
    AnnoucementAddEditController.$inject = ['$location', 'firebaseUrl', 'HelperService', '$firebaseArray', '$filter', '$firebaseObject', '$sessionStorage'];
})();
