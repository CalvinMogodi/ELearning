(function () {
    'use strict';

    angular
        .module('EL')
        .controller('MessageAddEditController', MessageAddEditController);

    MessageAddEditController.$inject = ['$location']; 

    function MessageAddEditController($location) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'MessageAddEditController';

        activate();

        function activate() { }
    }
})();
