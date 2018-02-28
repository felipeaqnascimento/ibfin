'use strict';

/* Module for Bancos */

var bancosModule = angular.module('bancos.module', ['myApp']);

/**
 * Module for bancos
 */
bancosModule.config(['$routeProvider', function($routeProvider) {
    // Pages routes
    $routeProvider.when('/bancos',    {templateUrl: 'partials/bancos/bancos_list.html', controller: 'BancosCtrl'});
    $routeProvider.when('/bancos/new', {templateUrl: 'partials/bancos/bancos_form.html', controller: 'BancosCtrl'});
    $routeProvider.when('/bancos/:oidBancos', {templateUrl: 'partials/bancos/bancos_form.html', controller: 'BancosCtrl'});
}]);
