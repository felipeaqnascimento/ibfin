'use strict';

/* Module for ContasReceber */

var contasReceberModule = angular.module('contasReceber.module', ['myApp']);

/**
 * Module for contasReceber
 */
contasReceberModule.config(['$routeProvider', function($routeProvider) {
    // Pages routes
    $routeProvider.when('/contasReceber',    {templateUrl: 'partials/contasreceber/contasreceber_list.html', controller: 'ContasReceberCtrl'});
    $routeProvider.when('/contasReceberEfet',    {templateUrl: 'partials/contasreceber/contasreceberefet_list.html', controller: 'ContasReceberCtrl'});
    $routeProvider.when('/contasReceberDesfaz',    {templateUrl: 'partials/contasreceber/contasreceberdesfaz_list.html', controller: 'ContasReceberCtrl'});
    $routeProvider.when('/contasReceber/new', {templateUrl: 'partials/contasreceber/contasreceber_form.html', controller: 'ContasReceberCtrl'});
    $routeProvider.when('/contasReceber/:oidContasReceber', {templateUrl: 'partials/contasreceber/contasreceber_form.html', controller: 'ContasReceberCtrl'});
}]);
