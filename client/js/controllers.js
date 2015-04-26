'use strict';

angular.module('jghpChatApp.controllers', []).
    controller('AppCtrl', function ($scope, UsernameService, $routeParams) {

        $scope.$on('$routeChangeSuccess', function() {
            UsernameService.setUsername($routeParams.username);
            $scope.username = UsernameService.getUsername();
        });
    }).
    controller('ChatController', function ($scope, mySocket) {
        $scope.chatMessages = [];
        $scope.onlineUsers = [];

        mySocket.emit("join", {username: $scope.username});

        mySocket.on('newMessage', function (data) {
            $scope.chatMessages.push(data);
        });

        mySocket.on('onlineUsers', function (data) {
            $scope.onlineUsers = data;
        });

        $scope.send = function(message) {
            mySocket.emit("sendMessage", {username: $scope.username, text: message});
            $scope.newMessageText = "";
        };

    });
