'use strict';

// Declare app level module which depends on filters, and services

angular.module('jghpChatApp', [
    'jghpChatApp.controllers',
    'jghpChatApp.services',
    'jghpChatApp.directives',
    'ngRoute',
    'btford.socket-io',
    'luegg.directives'
]).
    config(function ($routeProvider, $locationProvider) {
        $routeProvider.
            when('/chat', {
                templateUrl: 'partials/chat',
                controller: 'ChatController'
            }).
            otherwise({
                redirectTo: '/chat'
            });

        $locationProvider.html5Mode(true);
    });
