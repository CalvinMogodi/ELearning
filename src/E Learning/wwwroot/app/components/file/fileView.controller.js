(function () {
    'use strict';

    angular
        .module('EL')
        .controller('FileController', FileController);

    FileController.$inject = ['$location']; 

    function FileController($location) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'FileController';

        activate();

        function activate() { }
    }
})();
