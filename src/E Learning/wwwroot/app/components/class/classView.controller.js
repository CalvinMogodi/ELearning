(function () {
    'use strict';

    angular
        .module('EL')
        .controller('ClassController', ClassController);

    ClassController.$inject = ['$location']; 

    function ClassController($location) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'ClassController';

        activate();

        function activate() { }
    }
})();
