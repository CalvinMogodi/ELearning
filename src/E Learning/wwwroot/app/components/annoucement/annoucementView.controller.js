(function () {
    'use strict';

    angular
        .module('EL')
        .controller('AnnoucementController', AnnoucementController);

    AnnoucementController.$inject = ['$location']; 

    function AnnoucementController($location) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'AnnoucementController';

        activate();

        function activate() { }
    }
})();
