(function () {
    'use strict';

    function StudentReportAddEditController($location, firebaseUrl, HelperService, $firebaseArray, $filter, $firebaseObject) {
        /* jshint validthis:true */
        var vm = this;
        var ref = new Firebase(firebaseUrl);
        vm.isEdit = false;

        init();
        function init() {
            vm.subject = HelperService.getAssignedRecord();
            vm.classes = $firebaseArray(ref.child('Class'));
            vm.heading = 'Add New subject';
            if (vm.subject) {
                vm.isEdit = true;
                vm.heading = 'Update subject';
                vm.subject.class = vm.subject.class;
                if (vm.subject)
                    vm.subject.date = new Date(vm.subject.date);
            }

        }

        vm.create = function (subject) {

            vm.formSubmitted = true;

            if (vm.subjectForm.$valid) {
                var obj = JSON.parse(subject.class);
                var annoucementRef = new Firebase(firebaseUrl + "/Subject");
                var subjects = $firebaseArray(annoucementRef);

                subject.date = $filter('date')(new Date(subject.date), 'yyyy-MM-dd');
                var newRecord = {
                    title: subject.title,
                    description: subject.description,
                    date: subject.date,
                    classId: obj.$id,
                };
                subjects.$add(newRecord);
                $location.path('/subject');
            }
        }

        vm.update = function (subject) {
            vm.formSubmitted = true;

            if (vm.subjectForm.$valid) {
                var obj = JSON.parse(subject.class);
                var editRef = new Firebase(firebaseUrl + "/Subject/" + subject.$id);
                subject.date = $filter('date')(new Date(subject.date), 'yyyy-MM-dd');
                var oldSubject = $firebaseObject(editRef);

                oldSubject.$id = subject.$id;
                oldSubject.description = subject.description;
                oldSubject.title = subject.title;
                oldSubject.date = subject.date;
                oldSubject.classId = obj.$id;

                oldSubject.$save();
                $location.path('/subject');
            }
        }

        vm.cancel = function () {
            $location.path('/subject');
        }
    }

    angular.module('EL').controller('StudentReportAddEditController', StudentReportAddEditController);
    StudentReportAddEditController.$inject = ['$location', 'firebaseUrl', 'HelperService', '$firebaseArray', '$filter', '$firebaseObject'];
})();
