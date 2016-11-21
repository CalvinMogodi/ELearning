(function () {
    'use strict';

    function ViewAssignmentResultController($location, firebaseUrl, HelperService, $firebaseArray, $filter, $firebaseObject, $sessionStorage) {
        var vm = this;
        var ref = new Firebase(firebaseUrl);
        vm.results = [];
        vm.heading = 'Assignment Results';

        init();
        function init() {
            vm.assignment = HelperService.getAssignedRecord();
            vm.uploadedAssignments = $firebaseArray(ref.child('UploadedAssignment'));
            vm.uploadedAssignments.$loaded(function (data) {
                vm.users = $firebaseArray(ref.child('User'));
                vm.users.$loaded(function (data) {
                for (var i = 0; i < vm.uploadedAssignments.length; i++) {
                    if (vm.uploadedAssignments[i].subjectId == vm.assignment.$id) {
                       
                            for (var u = 0; u < vm.users.length; u++) {
                                if (vm.uploadedAssignments[i].studentId == vm.users[u].$id) {
                                    vm.uploadedAssignments[i].user = vm.users[u];
                                    vm.results.push(vm.uploadedAssignments[i]);
                                    break;
                                }                               
                            }
                            
                       
                    }
                }
                });
            });
        }

        vm.downloadAssignment = function (assignment) {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", assignment.file);
            xhr.responseType = "arraybuffer";

            xhr.onload = function () {
                if (this.status === 200) {
                    var blob = new Blob([xhr.response], { type: "application/pdf" });
                    var objectUrl = URL.createObjectURL(blob);
                    window.open(objectUrl);
                }
            };
            xhr.send();
        }
    }

    angular.module('EL').controller('ViewAssignmentResultController', ViewAssignmentResultController);
    ViewAssignmentResultController.$inject = ['$location', 'firebaseUrl', 'HelperService', '$firebaseArray', '$filter', '$firebaseObject', '$sessionStorage'];
})();
