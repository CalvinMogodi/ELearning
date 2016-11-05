﻿(function () {
    'use strict'; 

    function SubjectQuizController($location, $firebaseArray, HelperService, firebaseUrl, $sessionStorage) {
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
                vm.quizAnswers = $firebaseArray(ref.child('QuizAnswer'));
                vm.quizAnswers.$loaded(function (data) {
                    for (var i = 0; i < vm.quizzes.length; i++) {
                        if (vm.quizzes[i].subjectId == vm.subject.$id) {
                            for (var j = 0; j < vm.quizAnswers.length; j++) {
                                if (vm.quizAnswers[j].studentId == $sessionStorage.userId && vm.quizAnswers[j].quizId == vm.quizzes[i].$id) {
                                    vm.quizzes[i].score = vm.quizAnswers[j].score;
                                    vm.quizzes[i].quizAnswered = true;                                    
                                }   
                            }
                            vm.subjectQuizzes.push(vm.quizzes[i]);
                        }   
                    }
                });
            });

        }

        vm.answerQuiz = function (quiz) {
            HelperService.assignCurrentRecord(quiz);
            $location.path('/quizQuestion');
        }

        vm.back = function () {
            $location.path('/subject');
        }
    }

    angular.module('EL').controller('SubjectQuizController', SubjectQuizController);
    SubjectQuizController.$inject = ['$location', '$firebaseArray', 'HelperService', 'firebaseUrl', '$sessionStorage'];
})();
