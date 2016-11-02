(function () {
    'use strict';

    function quizQuestionAddEdit($location) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'quizQuestionAddEdit';

        activate();

        function activate() { }
    }

    angular.module('EL').controller('quizQuestionAddEdit', quizQuestionAddEdit);
    quizQuestionAddEdit.$inject = ['$location'];
})();
