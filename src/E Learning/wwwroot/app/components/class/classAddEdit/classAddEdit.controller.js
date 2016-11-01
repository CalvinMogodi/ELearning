(function () {
    'use strict';

    function ClassAddEditController($location, firebaseUrl, HelperService, $firebaseArray, $filter, $firebaseObject) {
        /* jshint validthis:true */
        var vm = this;       
        var ref = new Firebase(firebaseUrl + "/Class");
        vm.isEdit = false;

        init();
        function init() {
            vm.class = HelperService.getAssignedRecord();
            vm.heading = 'Add New Class';
            if (vm.class) {
                vm.isEdit = true;
                vm.heading = 'Update Class';
            }
                
        }

        vm.create = function (classOjb) {

            vm.formSubmitted = true;

            if (vm.classForm.$valid) {
                var classes = $firebaseArray(ref);

                var today = $filter('date')(new Date(), 'yyyy-MM-dd');
                var newRecord = {
                    title: classOjb.title,
                    description: classOjb.description,
                    createdDate: today.toString(),
                };
                classes.$add(newRecord);
                $location.path('/class');
            }
        }

        vm.update = function (classOjb) {
            vm.formSubmitted = true;

            if (vm.classForm.$valid) {
                var editRef = new Firebase(firebaseUrl + "/Class/" + classOjb.$id);
                var oldClass = $firebaseObject(editRef);

                oldClass.$id = classOjb.$id;
                oldClass.description = classOjb.description;
                oldClass.title = classOjb.title;
                oldClass.createdDate = classOjb.createdDate;

                oldClass.$save();
                $location.path('/class');
            }
        }

        vm.cancel = function () {
            $location.path('/class');
        }
    }

    angular.module('EL').controller('ClassAddEditController', ClassAddEditController);
    ClassAddEditController.$inject = ['$location', 'firebaseUrl', 'HelperService', '$firebaseArray', '$filter', '$firebaseObject'];
})();
