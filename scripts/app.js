
    var myApp = angular.module('myApp', ['ui.router']);

    myApp.config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/landing');

        $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
            .state('landing', {
                url: '/landing',
                templateUrl: 'html/landing.html'
            })
    });

 

