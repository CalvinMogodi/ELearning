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

        return { getUsers: getUsers }
    }

    angular.module('EL').factory('UserFactory', UserFactory);
    UserFactory.$inject = ['$http', '$q', 'apiUrl'];
})();