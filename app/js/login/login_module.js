'use strict';

/* Module for login */

var loginModule = angular.module('login.module', ['myApp']);
/**
 * Module for login
 */
loginModule.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/login',    {templateUrl: 'partials/login/login.html', controller: 'LoginCtrl'});
}]);
