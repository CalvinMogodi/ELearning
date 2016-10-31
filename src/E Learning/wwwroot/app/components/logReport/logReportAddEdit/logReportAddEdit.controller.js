(function () {
    'use strict';

    angular
        .module('EL')
        .controller('LogReportAddEditController', LogReportAddEditController);

    LogReportAddEditController.$inject = ['$location']; 

    function LogReportAddEditController($location) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'LogReportAddEditController';

        activate();

        function activate() { }
    }
})();
