(function () {
    'use strict';

    angular
        .module('EL')
        .controller('AssignmentController', AssignmentController);

    AssignmentController.$inject = ['$location']; 

    function AssignmentController($location) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'AssignmentController';

        activate();

        function activate() { }
    }
})();
