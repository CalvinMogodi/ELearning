(function () {
    'use strict';

    function QuizAddEditController($location, firebaseUrl, HelperService, $firebaseArray, $filter, $firebaseObject) {
        /* jshint validthis:true */
        var vm = this;
        var ref = new Firebase(firebaseUrl);
        vm.isEdit = false;

        init();
        function init() {
            vm.quiz = HelperService.getAssignedRecord();
            vm.classes = $firebaseArray(ref.child('Class'));
            vm.heading = 'Add New Quiz';
            if (vm.quiz) {
                vm.isEdit = true;
                vm.heading = 'Update Quiz';
                vm.quiz.class = vm.quiz.class;
            }

        }

        vm.create = function (quiz) {

            vm.formSubmitted = true;

            if (vm.quizForm.$valid) {
                var quizRef = new Firebase(firebaseUrl + "/Quiz");
                var quizzes = $firebaseArray(quizRef);
                var newRecord = {
                    title: quiz.title,
                    description: quiz.description,
                    classId: quiz.class.$id,
                };
                quizzes.$add(newRecord);
                $location.path('/quiz');
            }
        }

        vm.update = function (quiz) {
            vm.formSubmitted = true;

            if (vm.quizForm.$valid) {
                var editRef = new Firebase(firebaseUrl + "/Quiz/" + quiz.$id);
                var oldQuiz = $firebaseObject(editRef);

                oldQuiz.$id = quiz.$id;
                oldQuiz.description = quiz.description;
                oldQuiz.title = quiz.title;
                oldQuiz.classId = quiz.class.$id;

                oldQuiz.$save();
                $location.path('/quiz');
            }
        }

        vm.cancel = function () {
            $location.path('/quiz');
        }
    }

    angular.module('EL').controller('QuizAddEditController', QuizAddEditController);
    QuizAddEditController.$inject = ['$location', 'firebaseUrl', 'HelperService', '$firebaseArray', '$filter', '$firebaseObject'];
})();
