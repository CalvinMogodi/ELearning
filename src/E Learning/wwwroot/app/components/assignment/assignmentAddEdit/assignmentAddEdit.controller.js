(function () {
    'use strict';

    angular
        .module('EL')
        .controller('AssignmentAddEditController', AssignmentAddEditController);

    AssignmentAddEditController.$inject = ['$location']; 

    function AssignmentAddEditController($location) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'AssignmentAddEditController';

        activate();

        function activate() { }
    }
})();
