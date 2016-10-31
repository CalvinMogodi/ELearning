(function () {
    'use strict';

    angular
        .module('EL')
        .controller('SubjectAddEditController', SubjectAddEditController);

    SubjectAddEditController.$inject = ['$location']; 

    function SubjectAddEditController($location) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'SubjectAddEditController';

        activate();

        function activate() { }
    }
})();
