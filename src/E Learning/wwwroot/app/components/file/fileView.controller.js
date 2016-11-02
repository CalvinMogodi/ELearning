(function () {
    'use strict';

    function FileController($location, $firebaseArray, HelperService, alertDialogService, modal, firebaseUrl) {
            /* jshint validthis:true */
            var vm = this;
            vm.heading = 'File';
            vm.icon = "add_box";
            var ref = new Firebase(firebaseUrl);
            vm.pagenation = {
                limit: 5,
                page: 1,
            };

            init();

            function init() {
                //load file with class that is linked to
                vm.files = $firebaseArray(ref.child('File'));
                vm.files.$loaded(function (data) {
                    vm.classes = $firebaseArray(ref.child('Class'));
                    vm.classes.$loaded(function (data) {
                        for (var i = 0; i < vm.files.length; i++) {
                            for (var j = 0; j < vm.classes.length; j++) {
                                if (vm.files[i].classId == vm.classes[j].$id) {
                                    vm.files[i].class = vm.classes[j];
                                    break;
                                }
                            }
                        }
                    });
                });

            }

            vm.newFile= function () {
                HelperService.assignCurrentRecord(undefined);
                $location.path('/fileAddEdit');
            }
            vm.editFile = function (file) {
                HelperService.assignCurrentRecord(file);
                $location.path('/fileAddEdit');
            }
            vm.deleteFile = function (file) {
                alertDialogService.setHeaderAndMessage('Delete', 'Are you sore you want to delete this class?');
                var templateUrl = '/app/common/alert/alertDialog.template.html';
                modal.show(templateUrl, 'alertDialogController').then(function (result) {
                    if (result) {
                        vm.files.$remove(file);
                    }
                });
            }

            vm.downloadFile = function (file) {

                var xhr = new XMLHttpRequest();
                xhr.open("GET", file.file);
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

    }

    angular.module('EL').controller('FileController', FileController);
    FileController.$inject = ['$location', '$firebaseArray', 'HelperService', 'alertDialogService', 'modal', 'firebaseUrl'];
})();
