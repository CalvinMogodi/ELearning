(function () {
    'use strict';

    angular
        .module('EL')
        .controller('FileAddEditController', FileAddEditController);

    FileAddEditController.$inject = ['$location']; 

    function FileAddEditController($location) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'FileAddEditController';

        activate();

        function activate() { }
    }
})();
