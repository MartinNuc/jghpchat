'use strict';

// Declare app level module which depends on filters, and services

angular.module('jghpChatApp', [
    'jghpChatApp.controllers',
    'jghpChatApp.services',
    'ngRoute',
    'btford.socket-io'
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
