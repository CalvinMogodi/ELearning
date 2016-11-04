(function () {
    'use strict'; 

    function SubjectQuizController($location, $firebaseArray, HelperService, firebaseUrl) {
        /* jshint validthis:true */
        var vm = this;
        vm.heading = 'Subject Quiz';
        vm.icon = "add_box";
        var ref = new Firebase(firebaseUrl);
        vm.subjectQuizzes = [];
        vm.pagenation = {
            limit: 5,
            page: 1,
        };

        init();

        function init() {
            vm.subject = HelperService.getAssignedRecord();

            //load assignments with class that is linked to
            vm.quizzes = $firebaseArray(ref.child('Quiz'));
            vm.quizzes.$loaded(function (data) {
                vm.users = $firebaseArray(ref.child('User'));
                vm.users.$loaded(function (data) {
                    for (var i = 0; i < vm.quizzes.length; i++) {
                        if (vm.quizzes[i].subjectId == vm.subject.$id) {
                            for (var j = 0; j < vm.users.length; j++) {
                                if (vm.users[j].$id == vm.quizzes[i].lecturerId) {
                                    vm.quizzes[i].lecturer = vm.users[j];
                                }
                            }
                            vm.subjectQuizzes.push(vm.quizzes[i]);
                        }
                    }
                });
            });

        }

        vm.back = function () {
            $location.path('/subject');
        }
    }

    angular.module('EL').controller('SubjectQuizController', SubjectQuizController);
    SubjectQuizController.$inject = ['$location', '$firebaseArray', 'HelperService', 'firebaseUrl'];
})();
