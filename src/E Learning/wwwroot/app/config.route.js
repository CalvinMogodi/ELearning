(function () {
    'use strict';

    var routeProvider = function ($routeProvider, $locationProvider) {

        var viewBase = '/app/components';
        var viewcommonBase = '/app/common';

    $routeProvider.when('/index', {
        controller: 'indexController',
        templateUrl: 'index.html',
        controllerAs: 'vm'
    }).when('/login', {
        controller: 'LoginController',
        templateUrl: viewcommonBase + '/login/login.html',
        controllerAs: 'vm'
    }).when('/dashboard', {
        controller: 'dashboardController',
        templateUrl: viewBase + '/dashboard/dashboard.html',
        controllerAs: 'vm'
    }).when('/annoucement', {
        controller: 'AnnoucementController',
        templateUrl: viewBase + '/annoucement/annoucementView.html',
        controllerAs: 'vm'
    }).when('/annoucementAddEdit', {
        controller: 'AnnoucementAddEditController',
        templateUrl: viewBase + '/annoucement/annoucementAddEdit/annoucementAddEdit.html',
        controllerAs: 'vm'
    }).when('/assignment', {
        controller: 'AssignmentController',
        templateUrl: viewBase + '/assignment/assignmentView.html',
        controllerAs: 'vm'
    }).when('/assignmentAddEdit', {
        controller: 'AssignmentAddEditController',
        templateUrl: viewBase + '/assignment/assignmentAddEdit/assignmentAddEdit.html',
        controllerAs: 'vm'
    }).when('/class', {
        controller: 'ClassController',
        templateUrl: viewBase + '/class/classView.html',
        controllerAs: 'vm'
    }).when('/classAddEdit', {
        controller: 'ClassAddEditController',
        templateUrl: viewBase + '/class/classAddEdit/classAddEdit.html',
        controllerAs: 'vm'
    }).when('/course', {
        controller: 'CourseController',
        templateUrl: viewBase + '/course/course.html',
        controllerAs: 'vm'
    }).when('/courseAddEdit', {
        controller: 'CourseAddEditController',
        templateUrl: viewBase + '/course/courseAddEdit/courseAddEdit.html',
        controllerAs: 'vm'
    }).when('/event', {
        controller: 'EventController',
        templateUrl: viewBase + '/event/eventView.html',
        controllerAs: 'vm'
    }).when('/eventAddEdit', {
        controller: 'EventAddEditController',
        templateUrl: viewBase + '/event/eventAddEdit/eventAddEdit.html',
        controllerAs: 'vm'
    }).when('/file', {
        controller: 'FileController',
        templateUrl: viewBase + '/file/fileView.html',
        controllerAs: 'vm'
    }).when('/fileAddEdit', {
        controller: 'FileAddEditController',
        templateUrl: viewBase + '/file/fileAddEdit/fileAddEdit.html',
        controllerAs: 'vm'
    }).when('/logReport', {
        controller: 'LogReportController',
        templateUrl: viewBase + '/logReport/logReportView.html',
        controllerAs: 'vm'
    }).when('/logReportAddEdit', {
        controller: 'LogReportAddEditController',
        templateUrl: viewBase + '/logReport/logReportAddEdit/logReportAddEdit.html',
        controllerAs: 'vm'
    }).when('/message', {
        controller: 'MessageController',
        templateUrl: viewBase + '/message/messageView.html',
        controllerAs: 'vm'
    }).when('/messageAddEdit', {
        controller: 'MessageAddEditController',
        templateUrl: viewBase + '/message/messageAddEdit/messageAddEdit.html',
        controllerAs: 'vm'
    }).when('/schoolYear', {
        controller: 'SchoolYearController',
        templateUrl: viewBase + '/schoolYear/schoolYearView.html',
        controllerAs: 'vm'
    }).when('/schoolYearAddEdit', {
        controller: 'SchoolYearAddEditController',
        templateUrl: viewBase + '/schoolYear/schoolYearAddEdit/schoolYearAddEdit.html',
        controllerAs: 'vm'
    }).when('/studentsReport', {
        controller: 'StudentReportController',
        templateUrl: viewBase + '/studentReport/studentReportView.html',
        controllerAs: 'vm'
    }).when('/studentAddEdit', {
        controller: 'StudentReportAddEditController',
        templateUrl: viewBase + '/studentReport/studentReportAddEdit/studentReportAddEdit.html',
        controllerAs: 'vm'
    }).when('/subject', {
        controller: 'SubjectController',
        templateUrl: viewBase + '/subject/subjectView.html',
        controllerAs: 'vm'
    }).when('/subjectAddEdit', {
        controller: 'SubjectAddEditController',
        templateUrl: viewBase + '/subject/subjectAddEdit/subjectAddEdit.html',
        controllerAs: 'vm'
    }).when('/user', {
        controller: 'UserController',
        templateUrl: viewBase + '/user/userView.html',
        controllerAs: 'vm'
    }).when('/userAddEdit', {
        controller: 'UserAddEditController',
        templateUrl: viewBase + '/user/userAddEdit/userAddEdit.html',
        controllerAs: 'vm'
    }).when('/quiz', {
        controller: 'QuizController',
        templateUrl: viewBase + '/quiz/quizView.html',
        controllerAs: 'vm'
    }).when('/quizAddEdit', {
        controller: 'QuizAddEditController',
        templateUrl: viewBase + '/quiz/quizAddEdit/quizAddEdit.html',
        controllerAs: 'vm'
    }).when('/sentMessage', {
        controller: 'sentMessageController',
        templateUrl: viewBase + '/message/sentMessage/sentMessage.html',
        controllerAs: 'vm'
    }).when('/classAnnoucement', {
        controller: 'ClassAnnoucementController',
        templateUrl: viewBase + '/class/classannoucement/classannoucement.html',
        controllerAs: 'vm'
    }).when('/classAssignment', {
        controller: 'ClassAssignmentController',
        templateUrl: viewBase + '/class/classAssignment/classAssignment.html',
        controllerAs: 'vm'
    }).otherwise({ redirectTo: '/' });
    }

    angular.module('EL').config(['$routeProvider', '$locationProvider', routeProvider]);
    routeProvider.$inject = ['$routeProvider', '$locationProvider'];

})();