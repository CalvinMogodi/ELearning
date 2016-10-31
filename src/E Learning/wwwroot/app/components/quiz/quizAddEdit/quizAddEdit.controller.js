(function () {
    'use strict';

    angular
        .module('EL')
        .controller('QuizAddEditController', QuizAddEditController);

    QuizAddEditController.$inject = ['$location']; 

    function QuizAddEditController($location) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'QuizAddEditController';

        activate();

        function activate() { }
    }
})();
