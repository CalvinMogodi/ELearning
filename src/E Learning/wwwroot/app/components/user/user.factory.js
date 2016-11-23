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

        var userExists = function (username) {

            var defered = $q.defer();
            var userExistsComplete = function (response) {
                defered.resolve(JSON.parse(response.data));
            }

            $http.post(apiUrl + 'tbUserExists?username=' + username).then(userExistsComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }

        var gettbUser = function (username) {

            var defered = $q.defer();
            var gettbUserComplete = function (response) {
                defered.resolve(JSON.parse(response.data));
            }

            $http.get(apiUrl + 'tbUsers?username=' + username).then(gettbUserComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }

        var editUser = function (user) {

            var defered = $q.defer();
            var editUserComplete = function (response) {
                defered.resolve(response.data);
            }

            $http.put(apiUrl + 'tbUsers/EditUser', user).then(editUserComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }

        var createUser = function (user) {

            var defered = $q.defer();
            var createUserComplete = function (response) {
                defered.resolve(response.data);
            }

            $http.post(apiUrl + 'tbUsers/CreateUser', user).then(createUserComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }

        var deleteUser = function (userId) {

            var defered = $q.defer();
            var createUserComplete = function (response) {
                defered.resolve(response.data);
            }

            $http.delete(apiUrl + 'tbUsers/DeletetbUser?id=' +userId).then(createUserComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }

        return {
            getUsers: getUsers,
            loginUser: loginUser,
            gettbUser: gettbUser,
            editUser: editUser,
            createUser: createUser,
            deleteUser: deleteUser,
        }
    }

    angular.module('EL').factory('UserFactory', UserFactory);
    UserFactory.$inject = ['$http', '$q', 'apiUrl'];
})();