'use strict';

/* Services */

var jghpChatServices = angular.module('jghpChatApp.services', ['btford.socket-io']);

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

jghpChatServices.factory('ChatService',function($http) {
    var service = {};
    service.loadHistory = function() {
        return $http.get('api/history');
    };
    return service;
});

jghpChatServices.factory('mySocket', function (socketFactory) {
    return socketFactory();
});