(function () {
    'use strict';

    function quizQuestionContorller($location, firebaseUrl, HelperService, $firebaseArray, alertDialogService, $firebaseObject, modal, $sessionStorage) {
        /* jshint validthis:true */
        var vm = this;
        var ref = new Firebase(firebaseUrl);
        vm.isEdit = false;
        vm.quizQuestions = [];
        vm.isStudent = false;

        init();
        function init() {
            vm.quiz = HelperService.getAssignedRecord();
            vm.questions = $firebaseArray(ref.child('QuizQuestion'));
            vm.questions.$loaded(function (data) {
                for (var i = 0; i < vm.questions.length; i++) {
                    if (vm.questions[i].quizId == vm.quiz.$id) {
                        vm.quizQuestions.push(vm.questions[i]);
                    }
                }
            });
            if ($sessionStorage.userType == 'student') {
                vm.isStudent = true;
            }
        }

        vm.addQuestion = function (question) {

            vm.formSubmitted = true;

            if (vm.questionForm.$valid) {
                var addRef = new Firebase(firebaseUrl + "/QuizQuestion");
                var questions = $firebaseArray(addRef);

                var newRecord = {
                    type: question.questionType,
                    description: question.description,
                    answer: question.answer,
                    quizId: vm.quiz.$id,
                };
                questions.$add(newRecord);
                vm.quizQuestions.push(newRecord);
                vm.question.description = undefined;
                vm.question.questionType = undefined;
                vm.question.answer = undefined;
            }
        }

        vm.deleteQuestion = function (question) {
            alertDialogService.setHeaderAndMessage('Delete', 'Are you sure you want to delete this question?');
            var templateUrl = '/app/common/alert/alertDialog.template.html';
            modal.show(templateUrl, 'alertDialogController').then(function (result) {
                if (result) {
                    vm.questions.$remove(question);
                }
            });
        }

        vm.cancel = function () {
            $location.path('/subject');
        }

        vm.done = function (quizQuestionsAndAnswer) {
            var totalQuestions = quizQuestionsAndAnswer.length;
            var correctAnswers = 0;

            for (var i = 0; i < quizQuestionsAndAnswer.length; i++) {
                if (quizQuestionsAndAnswer[i].type == 'YesNo') {
                    if (quizQuestionsAndAnswer[i].studentAnswer == quizQuestionsAndAnswer[i].answer) {
                        correctAnswers++;
                    }
                }
                else {
                    if (quizQuestionsAndAnswer[i].studentAnswer.toLowerCase() == quizQuestionsAndAnswer[i].answer.toLowerCase()) {
                        correctAnswers++;
                    }
                }
                
            }

            var addRef = new Firebase(firebaseUrl + "/QuizAnswer");
            var auizAnswers = $firebaseArray(addRef);

            var newRecord = {
                studentId: $sessionStorage.userId,
                score: correctAnswers  + '/' + totalQuestions,
                quizId: vm.quiz.$id,
            };
            auizAnswers.$add(newRecord);
            $location.path('/subject');
        }
    }

    angular.module('EL').controller('quizQuestionContorller', quizQuestionContorller);
    quizQuestionContorller.$inject = ['$location', 'firebaseUrl', 'HelperService', '$firebaseArray', 'alertDialogService', '$firebaseObject', 'modal', '$sessionStorage'];
})();
