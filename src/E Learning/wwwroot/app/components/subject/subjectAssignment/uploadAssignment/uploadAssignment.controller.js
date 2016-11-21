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
             var assignmentRef = new Firebase(firebaseUrl + "/UploadedAssignment");
             var assignments = $firebaseArray(assignmentRef);

             var newRecord = {
                 subjectId: vm.assignment.$id,
                 studentId: $sessionStorage.userId,
             };
             assignments.$add(newRecord);
             $location.path('/subject');
         }

         vm.cancel = function () {
             $location.path('/subject');
         }

        }        

        angular.module('EL').controller('UploadAssignmentController', UploadAssignmentController);
        UploadAssignmentController.$inject = ['$location', 'firebaseUrl', '$sessionStorage', 'HelperService', '$firebaseArray'];
})();
