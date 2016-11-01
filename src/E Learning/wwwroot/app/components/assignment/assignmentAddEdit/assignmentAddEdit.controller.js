(function () {
    'use strict';

    function AssignmentAddEditController($location, firebaseUrl, HelperService, $firebaseArray, $filter, $firebaseObject) {
        /* jshint validthis:true */
        var vm = this;
        var ref = new Firebase(firebaseUrl);
        vm.isEdit = false;

        init();
        function init() {
            vm.assignment = HelperService.getAssignedRecord();
            vm.classes = $firebaseArray(ref.child('Class'));
            vm.heading = 'Add New Assignment';
            if (vm.assignment) {
                vm.isEdit = true;
                vm.heading = 'Update Assignment';
                vm.assignment.class = vm.assignment.class;
                vm.assignment.date = new Date(vm.assignment.date);
            }

        }

        vm.create = function (assignment) {

            vm.formSubmitted = true;

            if (vm.assignmentForm.$valid) {
              
                var f = document.getElementById('file').files[0],
                r = new FileReader();
                r.onloadend = function (e) {
                    var data = e.target.result;
                    //send your binary data via $http or $resource or do anything else with it

                    var obj = JSON.parse(assignment.class);
                    var assignmentRef = new Firebase(firebaseUrl + "/Assignment");
                    var assignments = $firebaseArray(assignmentRef);

                    assignment.date = $filter('date')(new Date(assignment.date), 'yyyy-MM-dd');
                    var newRecord = {
                        title: assignment.title,
                        description: assignment.description,
                        date: assignment.date,
                        file: data,
                        classId: obj.$id,
                    };
                    assignments.$add(newRecord);
                    $location.path('/assignment');

                }
                r.readAsDataURL(f);

               

                
            }
        }

        vm.update = function (assignment) {
            vm.formSubmitted = true;

            if (vm.assignmentForm.$valid) {
                var obj = JSON.parse(assignment.class);
                var editRef = new Firebase(firebaseUrl + "/Assignment/" + assignment.$id);
                assignment.date = $filter('date')(new Date(assignment.date), 'yyyy-MM-dd');
                var oldAssignmentt = $firebaseObject(editRef);

                oldAssignmentt.$id = assignment.$id;
                oldAssignmentt.description = assignment.description;
                oldAssignmentt.title = assignment.title;
                oldAssignmentt.date = assignment.date;
                oldAssignmentt.classId = obj.$id;

                oldAssignmentt.$save();
                $location.path('/assignment');
            }
        }

        vm.cancel = function () {
            $location.path('/assignment');
        }
    }

    angular.module('EL').controller('AssignmentAddEditController', AssignmentAddEditController);
    AssignmentAddEditController.$inject = ['$location', 'firebaseUrl', 'HelperService', '$firebaseArray', '$filter', '$firebaseObject'];
})();
