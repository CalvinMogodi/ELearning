(function () {
    'use strict';

    function HelperService(firebaseUrl, $firebaseArray) {

        var self = this;
        self.record;
        var ref = new Firebase(firebaseUrl);
        self.classes = $firebaseArray(ref.child('Class'));

        self.assignCurrentRecord = function (record) {
            self.record = record;
        }

        self.getAssignedRecord = function () {
            return self.record;
        }

        return self;
    }

    angular.module('EL').service('HelperService', HelperService);
    HelperService.$inject = ['firebaseUrl', '$firebaseArray'];

})();