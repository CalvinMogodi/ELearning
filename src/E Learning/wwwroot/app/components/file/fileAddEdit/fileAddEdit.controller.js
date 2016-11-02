(function () {
    'use strict';

    function FileAddEditController($location, firebaseUrl, HelperService, $firebaseArray, $filter, $firebaseObject) {
        /* jshint validthis:true */
        var vm = this;
        var ref = new Firebase(firebaseUrl);
        vm.isEdit = false;

        init();
        function init() {
            vm.file = HelperService.getAssignedRecord();
            vm.classes = $firebaseArray(ref.child('Class'));
            vm.heading = 'Add New File';
            if (vm.file) {
                vm.isEdit = true;
                vm.heading = 'Update File';
                vm.file.class = vm.file.class;
            }

        }

        vm.create = function (file) {

            vm.formSubmitted = true;

            if (vm.fileForm.$valid) {
                var f = document.getElementById('file').files[0];
                if (f != undefined) {
                    var r = new FileReader();
                    r.onloadend = function (e) {
                        var data = e.target.result;
                        //send your binary data via $http or $resource or do anything else with it
                        var obj = JSON.parse(file.class);
                        var fileRef = new Firebase(firebaseUrl + "/File");
                        var files = $firebaseArray(fileRef);

                        var newRecord = {
                            title: file.title,
                            description: file.description,
                            classId: obj.$id,
                            file: data,
                            fileName: f.name,
                        };
                        files.$add(newRecord);
                        $location.path('/file');

                    }
                    r.readAsDataURL(f);
                } else {
                    //Please choose a file to upload
                }
            }
        }

        vm.update = function (file) {

            vm.formSubmitted = true;
            if (vm.fileForm.$valid) {

                var obj = JSON.parse(file.class);
                var editRef = new Firebase(firebaseUrl + "/File/" + file.$id);
                var oldFile = $firebaseObject(editRef);

                var f = document.getElementById('file').files[0];
                if (f != undefined) {
                    var r = new FileReader();
                    r.onloadend = function (e) {
                        var data = e.target.result;

                        oldFile.$id = file.$id;
                        oldFile.description = file.description;
                        oldFile.title = file.title;
                        oldFile.classId = obj.$id;
                        oldFile.file = data;
                        oldFile.fileName = f.name;
                        
                        oldFile.$save();
                        $location.path('/file');

                    }
                    r.readAsDataURL(f);
                }
                else {

                    oldFile.$id = file.$id;
                    oldFile.description = file.description;
                    oldFile.title = file.title;
                    oldFile.classId = obj.$id;
                    oldFile.file = file.file;
                    oldFile.fileName = file.fileName;

                    oldFile.$save();
                    $location.path('/file');
                }
            }
        }

        vm.cancel = function () {
            $location.path('/file');
        }
    }

    angular.module('EL').controller('FileAddEditController', FileAddEditController);
    FileAddEditController.$inject = ['$location', 'firebaseUrl', 'HelperService', '$firebaseArray', '$filter', '$firebaseObject'];
})();
