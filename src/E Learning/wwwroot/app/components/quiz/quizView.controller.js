(function () {
    'use strict';

    angular
        .module('EL')
        .controller('QuizController', QuizController);

    QuizController.$inject = ['$location']; 

    function QuizController($location) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'QuizController';

        activate();

        function activate() { }
    }
})();
