(function () {
    'use strict';

    angular
        .module('EL')
        .controller('DepartmentController', DepartmentController);

    DepartmentController.$inject = ['$location']; 

    function DepartmentController($location) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'DepartmentController';

        activate();

        function activate() { }
    }
})();
