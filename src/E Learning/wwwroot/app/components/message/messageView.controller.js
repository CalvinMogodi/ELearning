(function () {
    'use strict';

    angular
        .module('EL')
        .controller('MessageController', MessageController);

    MessageController.$inject = ['$location']; 

    function MessageController($location) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'MessageController';

        activate();

        function activate() { }
    }
})();
