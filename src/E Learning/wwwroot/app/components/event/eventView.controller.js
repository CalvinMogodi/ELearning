(function () {
    'use strict';

    angular
        .module('EL')
        .controller('EventController', EventController);

    EventController.$inject = ['$location']; 

    function EventController($location) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'EventController';

        activate();

        function activate() { }
    }
})();
