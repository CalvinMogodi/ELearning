(function () {
    'use strict';

    function UserFactory($http, $q, apiUrl) {

        var getUsers = function () {

            var defered = $q.defer();
            var getUsersComplete = function (response) {
                defered.resolve(JSON.parse(response.data));
            }

            $http.get(apiUrl + 'tbUsers').then(getUsersComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }

        var loginUser = function (username, password) {

            var defered = $q.defer();
            var getUsersComplete = function (response) {
                defered.resolve(JSON.parse(response.data));
            }

            $http.post(apiUrl + 'tbUsers?username=' + username + '&password=' + password).then(getUsersComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }

        return {
            getUsers: getUsers,
            loginUser: loginUser,
        }
    }

    angular.module('EL').factory('UserFactory', UserFactory);
    UserFactory.$inject = ['$http', '$q', 'apiUrl'];
})();