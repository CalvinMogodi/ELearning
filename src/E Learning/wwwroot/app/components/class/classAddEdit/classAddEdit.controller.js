(function () {
    'use strict';

    angular
        .module('EL')
        .controller('ClassAddEditController', ClassAddEditController);

    ClassAddEditController.$inject = ['$location']; 

    function ClassAddEditController($location) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'ClassAddEditController';

        activate();

        function activate() { }
    }
})();
