(function () {
    'use strict';

    function QuizFactory($http, $q, apiUrl) {
        var getQuizs = function () {

            var defered = $q.defer();
            var getQuizsComplete = function (response) {
                defered.resolve(JSON.parse(response.data));
            }

            $http.get(apiUrl + 'Quiz/GetQuizes').then(getQuizsComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }

        var editQuiz = function (Quiz) {

            var defered = $q.defer();
            var editQuizComplete = function (response) {
                defered.resolve(response.data);
            }

            Quiz.subject = undefined;
            $http.put(apiUrl + 'Quiz/Edit', Quiz).then(editQuizComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }

        var createQuiz = function (Quiz) {

            var defered = $q.defer();
            var createQuizComplete = function (response) {
                defered.resolve(response.data);
            }

            Quiz.subject = undefined;
            $http.post(apiUrl + 'Quiz/Create', Quiz).then(createQuizComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }

        var deleteQuiz = function (QuizId) {

            var defered = $q.defer();
            var deleteQuizComplete = function (response) {
                defered.resolve(response.data);
            }

            $http.delete(apiUrl + 'Quiz/Delete?id=' + QuizId).then(deleteQuizComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }

        return {
            getQuizs: getQuizs,
            editQuiz: editQuiz,
            createQuiz: createQuiz,
            deleteQuiz: deleteQuiz,
        }
    }

    angular.module('EL').factory('QuizFactory', QuizFactory);
    QuizFactory.$inject = ['$http', '$q', 'apiUrl'];
})();