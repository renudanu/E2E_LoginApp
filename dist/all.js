'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('loginApp', ['ui.router']);

/*
 app.config(['$routeProvider', function($routeProvider) {
 $routeProvider.when('/login',
 {templateUrl:'view/login.tpl.html',
 controller:'loginController'}),
 $routeProvider.when('/home',
 {templateUrl:'view/home.tpl.html',
 controller:'homeController'}),
 $routeProvider.otherwise({redirectTo: '/login'});
 }]);
 */
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



           // params: { message: null }
            /*,
            params: {
                message:null
            }*/
        });


});

/*
app.controller('MainCtrl', function ($state) {
    $state.transitionTo('login');
})*/
