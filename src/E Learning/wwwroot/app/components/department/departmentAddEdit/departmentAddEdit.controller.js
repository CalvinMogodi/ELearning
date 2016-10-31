(function () {
    'use strict';

    angular
        .module('EL')
        .controller('DepartmentAddEditController', DepartmentAddEditController);

    DepartmentAddEditController.$inject = ['$location']; 

    function DepartmentAddEditController($location) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'DepartmentAddEditController';

        activate();

        function activate() { }
    }
})();
