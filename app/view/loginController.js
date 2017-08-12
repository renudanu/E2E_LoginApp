'use strict'

app.controller('loginController', function($scope, loginRepository,$state){

    $scope.userName='';
    $scope.password='';

    $scope.message='';

    var userList;

    $scope.login = function() {
        loginRepository.login().then(function(result){

            _.each(result, function (user) {
                if (user.username === $scope.userName && user.password === $scope.password) {
                    $scope.message = user.successMessage;
                    $state.go("home",{loginMessage:$scope.message})
                }
            });

        });

    }
});