'use strict';

var controllers = angular.module('jghpChatApp.controllers', []);

controllers.controller('AppCtrl', function ($scope, UsernameService, $routeParams) {

    /**
     * Grab username from url param ?username=<username>
     */
    $scope.$on('$routeChangeSuccess', function () {
        UsernameService.setUsername($routeParams.username);
        $scope.username = UsernameService.getUsername();
    });
});

/**
 * Main chat controller
 */
controllers.controller('ChatController', function ($scope, mySocket, ChatService) {
    $scope.chatMessages = [];
    $scope.onlineUsers = [];

    /**
     * Load last messages on load
     */
    ChatService.loadHistory().success(function (data) {
        data.reverse(); // messages are reversed
        $scope.chatMessages = data;
    });

    // send message that username joined chat
    mySocket.emit("join", {username: $scope.username});

    /**
     * new message arrived
     */
    mySocket.on('newMessage', function (data) {
        $scope.chatMessages.push(data);
    });

    /**
     * refreshing online users
     */
    mySocket.on('onlineUsers', function (data) {
        $scope.onlineUsers = data;
    });

    /**
     * send new message
     * @param message
     */
    $scope.send = function (message) {
        if (message) {
            mySocket.emit("sendMessage", {username: $scope.username, text: message});
            $scope.newMessageText = "";
        }
    };

});
