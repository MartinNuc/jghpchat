'use strict';

/* Services */

var jghpChatServices = angular.module('jghpChatApp.services', ['btford.socket-io']);

/**
 * Used to store username
 */
jghpChatServices.factory('UsernameService',function() {
    var service = { username: "guest"};
    service.getUsername = function() {
        return this.username;
    };
    service.setUsername = function (username) {
        if (username) {
            this.username = username;
        } else {
            this.username = "guest";
        }
    };
    return service;
});

/**
 * Service for server api
 */
jghpChatServices.factory('ChatService',function($http) {
    var service = {};
    service.loadHistory = function() {
        return $http.get('api/history');
    };
    return service;
});

/**
 * Service for Socket.io
 */
jghpChatServices.factory('mySocket', function (socketFactory) {
    return socketFactory();
});