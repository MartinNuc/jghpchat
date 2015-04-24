'use strict';

/* Services */

var jghpChatServices = angular.module('jghpChatApp.services', ['ngRoute']);

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