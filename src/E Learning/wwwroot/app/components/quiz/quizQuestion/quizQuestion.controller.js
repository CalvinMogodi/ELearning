(function () {
    'use strict';

    function quizQuestionContorller($location, firebaseUrl, HelperService, $firebaseArray, alertDialogService, $firebaseObject, modal) {
        /* jshint validthis:true */
        var vm = this;
        var ref = new Firebase(firebaseUrl);
        vm.isEdit = false;

        init();
        function init() {
            vm.quiz = HelperService.getAssignedRecord();
            vm.questions = $firebaseArray(ref.child('QuizQuestion'));
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
            }
        }

        vm.deleteQuestion = function (question) {
            alertDialogService.setHeaderAndMessage('Delete', 'Are you sore you want to delete this question?');
            var templateUrl = '/app/common/alert/alertDialog.template.html';
            modal.show(templateUrl, 'alertDialogController').then(function (result) {
                if (result) {
                    vm.questions.$remove(question);
                }
            });
        }

        vm.cancel = function () {
            $location.path('/quiz');
        }
    }

    angular.module('EL').controller('quizQuestionContorller', quizQuestionContorller);
    quizQuestionContorller.$inject = ['$location', 'firebaseUrl', 'HelperService', '$firebaseArray', 'alertDialogService', '$firebaseObject', 'modal'];
})();
