(function () {
    'use strict';

    function SubjectAnnoucementController($location, $firebaseArray, HelperService, firebaseUrl) {
        /* jshint validthis:true */
        var vm = this;
        vm.heading = 'Class Annoucement';
        vm.icon = "add_box";
        var ref = new Firebase(firebaseUrl);
        vm.classAnnoucements = [];
        vm.pagenation = {
            limit: 5,
            page: 1,
        };

        init();

        function init() {
            vm.subject = HelperService.getAssignedRecord();

            //load annoucements with class that is linked to
            vm.annoucements = $firebaseArray(ref.child('Annoucement'));
            vm.annoucements.$loaded(function (data) {
                vm.users = $firebaseArray(ref.child('User'));
                vm.users.$loaded(function (data) {
                    for (var i = 0; i < vm.annoucements.length; i++) {
                        if (vm.annoucements[i].subjectId == vm.subject.$id) {
                            for (var j = 0; j < vm.users.length; j++) {
                                if (vm.users[j].$id == vm.annoucements[i].lecturerId) {
                                    vm.annoucements[i].lecturer = vm.users[j];
                                }                            
                            }
                            vm.classAnnoucements.push(vm.annoucements[i]);
                        }   
                    }
                });
            });

        }
        vm.back = function () {
            $location.path('/subject');
        }

    }

    angular.module('EL').controller('SubjectAnnoucementController', SubjectAnnoucementController);
    SubjectAnnoucementController.$inject = ['$location', '$firebaseArray', 'HelperService', 'firebaseUrl'];
})();
