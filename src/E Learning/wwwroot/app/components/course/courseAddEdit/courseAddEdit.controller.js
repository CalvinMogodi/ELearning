(function () {
    'use strict';

    angular
        .module('app')
        .controller('courseAddEdit', courseAddEdit);

    courseAddEdit.$inject = ['$location']; 

    function courseAddEdit($location) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'courseAddEdit';

        activate();

        function activate() { }
    }
})();
