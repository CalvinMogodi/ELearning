(function () {
    'use strict';

    angular
        .module('EL')
        .controller('AnnoucementAddEditController', AnnoucementAddEditController);

    AnnoucementAddEditController.$inject = ['$location']; 

    function AnnoucementAddEditController($location) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'AnnoucementAddEditController';

        activate();

        function activate() { }
    }
})();
