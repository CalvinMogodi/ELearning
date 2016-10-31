(function () {
    'use strict';

    angular
        .module('EL')
        .controller('EventAddEditController', EventAddEditController);

    EventAddEditController.$inject = ['$location']; 

    function EventAddEditController($location) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'EventAddEditController';

        activate();

        function activate() { }
    }
})();
