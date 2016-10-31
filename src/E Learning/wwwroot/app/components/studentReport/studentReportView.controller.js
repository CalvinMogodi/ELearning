(function () {
    'use strict';

    angular
        .module('EL')
        .controller('StudentReportController', StudentReportController);

    StudentReportController.$inject = ['$location']; 

    function StudentReportController($location) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'StudentReportController';

        activate();

        function activate() { }
    }
})();
