(function () {
    'use strict';

    angular
        .module('EL')
        .controller('LogReportController', LogReportController);

    LogReportController.$inject = ['$location']; 

    function LogReportController($location) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'LogReportController';

        activate();

        function activate() { }
    }
})();
