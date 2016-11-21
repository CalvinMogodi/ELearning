(function () {
    'use strict';

    function ResourcesController($location, $firebaseArray, HelperService, alertDialogService, modal, firebaseUrl) {
        /* jshint validthis:true */
        var vm = this;
        vm.heading = 'Resource';
        vm.icon = "add_box";
        var ref = new Firebase(firebaseUrl);
        vm.pagenation = {
            limit: 5,
            page: 1,
        };

        init();

        function init() {
            vm.resources = $firebaseArray(ref.child('Resource'));

        }

        vm.newResource = function () {
            HelperService.assignCurrentRecord(undefined);
            $location.path('/resourceAddEdit');
        }
      

        vm.downloadResource = function (resource) {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", resource.file);
            xhr.responseType = "arraybuffer";

            xhr.onload = function () {
                if (this.status === 200) {
                    var blob = new Blob([xhr.response], { type: "application/pdf" });
                    var objectUrl = URL.createObjectURL(blob);
                    window.open(objectUrl);
                }
            };
            xhr.send();
        }

        vm.deleteResource = function (resource) {
            alertDialogService.setHeaderAndMessage('Delete', 'Are you sure you want to delete this resource?');
            var templateUrl = '/app/common/alert/alertDialog.template.html';
            modal.show(templateUrl, 'alertDialogController').then(function (result) {
                if (result) {
                    vm.resources.$remove(resource);
                }
            });
        }
    }

    angular.module('EL').controller('ResourcesController', ResourcesController);
    ResourcesController.$inject = ['$location', '$firebaseArray', 'HelperService', 'alertDialogService', 'modal', 'firebaseUrl'];
})();
