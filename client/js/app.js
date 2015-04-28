'use strict';

var app = angular.module('jghpChatApp', [
    'jghpChatApp.controllers',
    'jghpChatApp.services',
    'jghpChatApp.directives',
    'ngRoute',
    'ngSanitize',
    'ngAnimate',
    'btford.socket-io',
    'luegg.directives'
]);

app.config(function ($routeProvider, $locationProvider) {
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
