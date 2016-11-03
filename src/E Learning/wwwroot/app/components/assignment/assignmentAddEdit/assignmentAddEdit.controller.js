(function () {
    'use strict';

    function AssignmentAddEditController($location, firebaseUrl, HelperService, $firebaseArray, $filter, $firebaseObject, $sessionStorage) {
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
              
                var f = document.getElementById('file').files[0];
                if (f != undefined) {
                  var r = new FileReader();
                    r.onloadend = function (e) {
                        //send your binary data via $http or $resource or do anything else with it
                        var obj = JSON.parse();
                        var assignmentRef = new Firebase(firebaseUrl + "/Assignment");
                        var assignments = $firebaseArray(assignmentRef);

                        assignment.date = $filter('date')(new Date(assignment.date), 'yyyy-MM-dd');
                        var newRecord = {
                            title: assignment.title,
                            description: assignment.description,
                            date: assignment.date,
                            file: data,
                            fileName: f.name,
                            classId: assignment.class.$id,
                            lecturerId: $sessionStorage.userId,
                        };
                        assignments.$add(newRecord);
                        $location.path('/assignment');

                    }
                    r.readAsDataURL(f);
                } else {
                    //Please choose a file to upload
                }
            }
        }

        vm.update = function (assignment) {
            vm.formSubmitted = true;
            if (vm.assignmentForm.$valid) {

                var obj = JSON.parse(assignment.class);
                var editRef = new Firebase(firebaseUrl + "/Assignment/" + assignment.$id);
                assignment.date = $filter('date')(new Date(assignment.date), 'yyyy-MM-dd');
                var oldAssignment = $firebaseObject(editRef);

            var f = document.getElementById('file').files[0];
            if (f != undefined) {
               var r = new FileReader();
                r.onloadend = function (e) {
                    var data = e.target.result;

                    oldAssignment.$id = assignment.$id;
                    oldAssignment.description = assignment.description;
                    oldAssignment.title = assignment.title;
                    oldAssignment.date = assignment.date;
                    oldAssignment.classId = obj.$id;
                    oldAssignment.file = data;
                    oldAssignment.fileName = f.name;
                    oldAssignment.lecturerId = $sessionStorage.userId;

                    oldAssignment.$save();
                    $location.path('/assignment');

                }
                r.readAsDataURL(f);
            }
            else {               

                    oldAssignment.$id = assignment.$id;
                    oldAssignment.description = assignment.description;
                    oldAssignment.title = assignment.title;
                    oldAssignment.date = assignment.date;
                    oldAssignment.classId = obj.$id;
                    oldAssignment.file = assignment.file;
                    oldAssignment.fileName = assignment.fileName;
                    oldAssignment.lecturerId = $sessionStorage.userId;

                    oldAssignment.$save();
                    $location.path('/assignment');
                }
            }            
        }

        vm.cancel = function () {
            $location.path('/assignment');
        }
    }

    angular.module('EL').controller('AssignmentAddEditController', AssignmentAddEditController);
    AssignmentAddEditController.$inject = ['$location', 'firebaseUrl', 'HelperService', '$firebaseArray', '$filter', '$firebaseObject', '$sessionStorage'];
})();
