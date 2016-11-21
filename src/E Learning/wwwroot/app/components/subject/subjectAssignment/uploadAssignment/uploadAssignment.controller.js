(function () {
    'use strict';

    function UploadAssignmentController($location, firebaseUrl, $sessionStorage, HelperService, $firebaseArray) {
        /* jshint validthis:true */
        var vm = this;
        vm.heading = 'Upload Assignment';
        vm.icon = "add_box";
        var ref = new Firebase(firebaseUrl);
        init();

        function init() {
            vm.assignment = HelperService.getAssignedRecord();
        }


        vm.upload = function () {
            var f = document.getElementById('file').files[0];
            if (f != undefined) {
                var r = new FileReader();
                r.onloadend = function (e) {
                    var data = e.target.result;
                    var assignmentRef = new Firebase(firebaseUrl + "/UploadedAssignment");
                    var assignments = $firebaseArray(assignmentRef);

                    var newRecord = {
                        subjectId: vm.assignment.$id,
                        studentId: $sessionStorage.userId,
                        file: data,
                    };
                    assignments.$add(newRecord);
                    $location.path('/subject');
                }
                r.readAsDataURL(f);
            } else {
                //Please choose a file to upload
            }
        }

        vm.cancel = function () {
            $location.path('/subject');
        }

    }

    angular.module('EL').controller('UploadAssignmentController', UploadAssignmentController);
    UploadAssignmentController.$inject = ['$location', 'firebaseUrl', '$sessionStorage', 'HelperService', '$firebaseArray'];
})();
