'use strict';

/* Module for ContasPagar */

var contasPagarModule = angular.module('contasPagar.module', ['myApp']);

/**
 * Module for contasPagar
 */
contasPagarModule.config(['$routeProvider', function($routeProvider) {
    // Pages routes
    $routeProvider.when('/contasPagar',    {templateUrl: 'partials/contaspagar/contaspagar_list.html', controller: 'ContasPagarCtrl'});
    $routeProvider.when('/contasPagarEfet',    {templateUrl: 'partials/contaspagar/contaspagarefet_list.html', controller: 'ContasPagarCtrl'});
    $routeProvider.when('/contasPagarDesfaz',    {templateUrl: 'partials/contaspagar/contaspagardesfaz_list.html', controller: 'ContasPagarCtrl'});
    $routeProvider.when('/contasPagar/new', {templateUrl: 'partials/contaspagar/contaspagar_form.html', controller: 'ContasPagarCtrl'});
    $routeProvider.when('/contasPagar/:oidContasPagar', {templateUrl: 'partials/contaspagar/contaspagar_form.html', controller: 'ContasPagarCtrl'});
}]);
