'use strict';

/* Services */

var jghpChatServices = angular.module('jghpChatApp.services', ['ngRoute']);

jghpChatServices.factory('UsernameService',function($routeParams) {
    var service = {};
    service.getUsername = function() {
        var paramUsername = $routeParams.username;console.log($routeParams);
        if (paramUsername) {
            return paramUsername;
        } else {
            return "guest";
        }
    };
    return service;
});