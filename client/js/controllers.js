'use strict';

angular.module('jghpChatApp.controllers', []).
    controller('AppCtrl', function ($scope, UsernameService, $routeParams) {

        $scope.$on('$routeChangeSuccess', function() {
            console.log($routeParams);
            UsernameService.setUsername($routeParams.username);
            $scope.username = UsernameService.getUsername();
        });
    }).
    controller('ChatController', function ($scope) {
        // write Ctrl here

    });
