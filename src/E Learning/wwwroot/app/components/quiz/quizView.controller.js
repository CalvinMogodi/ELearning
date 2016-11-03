(function () {
    'use strict';

    function QuizController($location, $firebaseArray, HelperService, alertDialogService, modal, firebaseUrl, $sessionStorage) {
        /* jshint validthis:true */
        var vm = this;
        vm.heading = 'Quiz';
        vm.icon = "add_box";
        vm.isStudent = false;
        vm.showAddButton = true;
        var ref = new Firebase(firebaseUrl);
        vm.pagenation = {
            limit: 5,
            page: 1,
        };

        init();

        function init() {
            if ($sessionStorage.userType == 'student') {
                vm.showAddButton = false;
                vm.isStudent = true;
            }
            //load quiz with class that is linked to
            vm.quizzes = $firebaseArray(ref.child('Quiz'));
            vm.quizzes.$loaded(function (data) {
                vm.classes = $firebaseArray(ref.child('Class'));
                vm.classes.$loaded(function (data) {
                    for (var i = 0; i < vm.quizzes.length; i++) {
                        for (var j = 0; j < vm.classes.length; j++) {
                            if (vm.quizzes[i].classId == vm.classes[j].$id) {
                                vm.quizzes[i].class = vm.classes[j];
                                break;
                            }
                        }
                    }
                });
            });

        }

        vm.newQuiz = function () {
            HelperService.assignCurrentRecord(undefined);
            $location.path('/quizAddEdit');
        }
        vm.editQuiz = function (quiz) {
            HelperService.assignCurrentRecord(quiz);
            $location.path('/quizAddEdit');
        }
        vm.deleteQuiz = function (quiz) {
            alertDialogService.setHeaderAndMessage('Delete', 'Are you sore you want to delete this class?');
            var templateUrl = '/app/common/alert/alertDialog.template.html';
            modal.show(templateUrl, 'alertDialogController').then(function (result) {
                if (result) {
                    vm.quizzes.$remove(quiz);
                }
            });
        }
    }

    angular.module('EL').controller('QuizController', QuizController);
    QuizController.$inject = ['$location', '$firebaseArray', 'HelperService', 'alertDialogService', 'modal', 'firebaseUrl', '$sessionStorage'];
})();
