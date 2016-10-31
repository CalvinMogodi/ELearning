(function () {
    'use strict';

    angular
        .module('EL')
        .controller('UserAddEditController', UserAddEditController);

    UserAddEditController.$inject = ['$location']; 

    function UserAddEditController($location) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'UserAddEditController';

        activate();

        function activate() { }
    }
})();
