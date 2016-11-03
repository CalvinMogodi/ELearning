(function () {
    'use strict';

    function StudentReportAddEditController($location, firebaseUrl, HelperService, $firebaseArray, $filter, $firebaseObject) {
        /* jshint validthis:true */
        var vm = this;
        var ref = new Firebase(firebaseUrl);
        vm.heading = 'Link Student To Course';

        init();
        function init() {
            vm.studentRecord = HelperService.getAssignedRecord();
            vm.courses = $firebaseArray(ref.child('Course'));
           
        }
        
        vm.link = function (record) {
            vm.formSubmitted = true;

            if (vm.studentForm.$valid) {
                var editRef = new Firebase(firebaseUrl + "/User/" + record.$id);
                var oldUser = $firebaseObject(editRef);

                oldUser.$id = record.$id;
                oldUser.firstname = record.firstname,
                oldUser.surname = record.surname,
                oldUser.userType = record.userType,
                oldUser.username = record.username,
                oldUser.password = record.password,
                oldUser.courseId = record.course.$id,

                oldUser.$save();
                $location.path('/studentsReport');
            }
        }

        vm.cancel = function () {
            $location.path('/studentsReport');
        }
    }

    angular.module('EL').controller('StudentReportAddEditController', StudentReportAddEditController);
    StudentReportAddEditController.$inject = ['$location', 'firebaseUrl', 'HelperService', '$firebaseArray', '$filter', '$firebaseObject'];
})();
