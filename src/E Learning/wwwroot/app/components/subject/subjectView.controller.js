(function () {
    'use strict';

    angular
        .module('EL')
        .controller('SubjectController', SubjectController);

    SubjectController.$inject = ['$location']; 

    function SubjectController($location) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'SubjectController';

        activate();

        function activate() { }
    }
})();
