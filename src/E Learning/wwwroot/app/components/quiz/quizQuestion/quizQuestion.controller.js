(function () {
    'use strict';

    function quizQuestionContorller($location) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'quizQuestion';

        activate();

        function activate() { }
    }

    angular.module('EL').controller('quizQuestionContorller', quizQuestionContorller);
    quizQuestionContorller.$inject = ['$location'];
})();
