﻿(function () {
    'use strict'; 

    function AnnoucementAddEditController($location, firebaseUrl, HelperService, $firebaseArray, $filter, $firebaseObject) {
        /* jshint validthis:true */
        var vm = this;
        var ref = new Firebase(firebaseUrl);        
        vm.isEdit = false;

        init();
        function init() {
            vm.annoucement = HelperService.getAssignedRecord();
            vm.classes = $firebaseArray(ref.child('Class'));
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
                var obj = JSON.parse(annoucement.class);
                var annoucementRef = new Firebase(firebaseUrl + "/Annoucement");
                var annoucements = $firebaseArray(annoucementRef);

                annoucement.date = $filter('date')(new Date(annoucement.date), 'yyyy-MM-dd');
                var newRecord = {
                    title: annoucement.title,
                    description: annoucement.description,
                    date: annoucement.date,
                    classId: obj.$id,
                };
                annoucements.$add(newRecord);
                $location.path('/annoucement');
            }
        }

        vm.update = function (annoucement) {
            vm.formSubmitted = true;

            if (vm.annoucementForm.$valid) {
                var obj = JSON.parse(annoucement.class);
                var editRef = new Firebase(firebaseUrl + "/Annoucement/" + annoucement.$id);
                annoucement.date = $filter('date')(new Date(annoucement.date), 'yyyy-MM-dd');
                var oldAnnoucement = $firebaseObject(editRef);

                oldAnnoucement.$id = annoucement.$id;
                oldAnnoucement.description = annoucement.description;
                oldAnnoucement.title = annoucement.title;
                oldAnnoucement.date = annoucement.date;
                oldAnnoucement.classId = obj.$id;
                
                oldAnnoucement.$save();
                $location.path('/annoucement');
            }
        }

        vm.cancel = function () {
            $location.path('/annoucement');
        }
    }

    angular.module('EL').controller('AnnoucementAddEditController', AnnoucementAddEditController);
    AnnoucementAddEditController.$inject = ['$location', 'firebaseUrl', 'HelperService', '$firebaseArray', '$filter', '$firebaseObject'];
})();
