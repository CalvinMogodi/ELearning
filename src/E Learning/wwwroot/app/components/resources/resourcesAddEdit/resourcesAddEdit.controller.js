(function () {
    'use strict';

    function ResourcesAddEditController($location, firebaseUrl, HelperService, $firebaseArray, $filter, $firebaseObject, $sessionStorage) {
        /* jshint validthis:true */
        var vm = this;
        var ref = new Firebase(firebaseUrl);

        init();
        function init() {
            vm.heading = 'Add New Resource';
        }

        vm.create = function (resource) {

            vm.formSubmitted = true;

            if (vm.resourceForm.$valid) {

                var f = document.getElementById('file').files[0];
                if (f != undefined) {
                    var r = new FileReader();
                    r.onloadend = function (e) {
                        var data = e.target.result;

                        var resourceRef = new Firebase(firebaseUrl + "/Resource");
                        var resources = $firebaseArray(resourceRef);

                        var newRecord = {
                            title: resource.title,
                            file: data,
                        };
                        resources.$add(newRecord);
                        $location.path('/resource');

                    }
                    r.readAsDataURL(f);
                } else {
                    //Please choose a file to upload
                }
            }
        }

        vm.cancel = function () {
            $location.path('/resource');
        }
    }

    angular.module('EL').controller('ResourcesAddEditController', ResourcesAddEditController);
    ResourcesAddEditController.$inject = ['$location', 'firebaseUrl', 'HelperService', '$firebaseArray', '$filter', '$firebaseObject', '$sessionStorage'];
})();
