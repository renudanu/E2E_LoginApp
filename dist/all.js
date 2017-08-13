'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('loginApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/login");

    $stateProvider
        .state('login', {
            url:'/login',
            templateUrl:'view/login.tpl.html',
            controller:'loginController'

        })

        .state('home', {
            url:'/home/?message',
            templateUrl:'view/home.tpl.html',
            controller:'homeController',
            params: {
                loginMessage: null
            }
        });
});

