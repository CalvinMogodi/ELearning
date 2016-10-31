(function () {
    'use strict';

    var app = angular.module('EL', ['ngRoute', 'firebase', 'ngStorage', 'ngMaterial', 'ngMessages', 'ngMenuSidenav', 'md.data.table', 'ui.grid', 'ui.grid.selection', 'ui.grid.exporter', 'angularMoment']);
    app.constant('firebaseUrl', 'https://flickering-torch-5362.firebaseio.com');

    //var config = {
    //    apiKey: "AIzaSyC_cqswJrfmcrjdmY0nMXUap54Bs7bXNew",
    //    authDomain: "elearning-b696b.firebaseapp.com",
    //    databaseURL: "https://elearning-b696b.firebaseio.com",
    //    storageBucket: "elearning-b696b.appspot.com",
    //    messagingSenderId: "972153111799"
    //};

    //firebase.initializeApp(config);

    app.run(function ($rootScope, $location, $sessionStorage, $timeout) {
        $rootScope.$on('$routeChangeSuccess', function () {
            $rootScope.currentUrl = $location.path();
        });
    });

})();