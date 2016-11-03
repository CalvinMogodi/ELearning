(function () {
    'use strict';

    angular
        .module('app')
        .controller('course', course);

    course.$inject = ['$location']; 

    function course($location) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'course';

        activate();

        function activate() { }
    }
})();
