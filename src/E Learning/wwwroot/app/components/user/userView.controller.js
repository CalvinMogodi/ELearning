(function () {
    'use strict';

    angular
        .module('EL')
        .controller('UserController', UserController);

    UserController.$inject = ['$location']; 

    function UserController($location) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'UserController';

        activate();

        function activate() { }
    }
})();
