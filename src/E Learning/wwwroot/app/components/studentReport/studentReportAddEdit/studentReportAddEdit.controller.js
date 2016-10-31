(function () {
    'use strict';

    angular
        .module('EL')
        .controller('StudentReportAddEditController', StudentReportAddEditController);

    StudentReportAddEditController.$inject = ['$location']; 

    function StudentReportAddEditController($location) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'StudentReportAddEditController';

        activate();

        function activate() { }
    }
})();
