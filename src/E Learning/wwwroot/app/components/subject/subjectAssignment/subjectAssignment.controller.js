(function () {
    'use strict';

    function SubjectAssignmentController($location, $firebaseArray, HelperService, firebaseUrl, $sessionStorage) {
        /* jshint validthis:true */
        var vm = this;
        vm.heading = 'Class Assignment';
        vm.icon = "add_box";
        var ref = new Firebase(firebaseUrl);
        vm.classAssignments = [];
        vm.pagenation = {
            limit: 5,
            page: 1,
        };

        init();

        function init() {
            vm.subject = HelperService.getAssignedRecord();
            vm.uploadedAssignment = $firebaseArray(ref.child('UploadedAssignment'));
            //load assignments with class that is linked to
            vm.assignments = $firebaseArray(ref.child('Assignment'));
            vm.assignments.$loaded(function (data) {
                vm.users = $firebaseArray(ref.child('User'));
                vm.users.$loaded(function (data) {
                    for (var i = 0; i < vm.assignments.length; i++) {
                        if (vm.assignments[i].subjectId == vm.subject.$id) {
                            for (var j = 0; j < vm.users.length; j++) {
                                if (vm.users[j].$id == vm.assignments[i].lecturerId) {
                                    vm.assignments[i].lecturer = vm.users[j];
                                }                            
                            }
                            for (var u = 0; u < vm.uploadedAssignment.length; u++) {
                                if (vm.assignments[i].$id == vm.uploadedAssignment[u].subjectId && $sessionStorage.userId == vm.uploadedAssignment[u].studentId) {
                                    vm.assignments[i].showUpload = true;
                                }
                            }
                            vm.classAssignments.push(vm.assignments[i]);
                        }   
                    }
                });
            });

        }
        vm.back = function () {
            $location.path('/subject');
        }

        vm.uploadAssignment = function (assignment) {
            HelperService.assignCurrentRecord(assignment);
            $location.path('/uploadAssignment');
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

    angular.module('EL').controller('SubjectAssignmentController', SubjectAssignmentController);
    SubjectAssignmentController.$inject = ['$location', '$firebaseArray', 'HelperService', 'firebaseUrl', '$sessionStorage'];
})();
