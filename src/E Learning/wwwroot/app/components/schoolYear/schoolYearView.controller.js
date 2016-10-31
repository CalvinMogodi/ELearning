(function () {
    'use strict';

    angular
        .module('EL')
        .controller('SchoolYearController', SchoolYearController);

    SchoolYearController.$inject = ['$location']; 

    function SchoolYearController($location) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'SchoolYearController';

        activate();

        function activate() { }
    }
})();
