(function () {
    'use strict';

    angular
        .module('EL')
        .controller('SchoolYearAddEditController', SchoolYearAddEditController);

    SchoolYearAddEditController.$inject = ['$location']; 

    function SchoolYearAddEditController($location) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'SchoolYearAddEditController';

        activate();

        function activate() { }
    }
})();
