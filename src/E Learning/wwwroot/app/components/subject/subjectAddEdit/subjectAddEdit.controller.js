(function () {
    'use strict';

    function SubjectAddEditController($location, firebaseUrl, HelperService, $firebaseArray, $filter, $firebaseObject) {
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
                var subjectRef = new Firebase(firebaseUrl + "/Subject");
                var subjects = $firebaseArray(subjectRef);

                subject.date = $filter('date')(new Date(subject.date), 'yyyy-MM-dd');
                var newRecord = {
                    code: subject.code,
                    title: subject.title,
                    description: subject.description,
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
                oldSubject.code = subject.code,
                oldSubject.classId = obj.$id;

                oldSubject.$save();
                $location.path('/subject');
            }
        }

        vm.cancel = function () {
            $location.path('/subject');
        }
    }

    angular.module('EL').controller('SubjectAddEditController', SubjectAddEditController);
    SubjectAddEditController.$inject = ['$location', 'firebaseUrl', 'HelperService', '$firebaseArray', '$filter', '$firebaseObject'];
})();
