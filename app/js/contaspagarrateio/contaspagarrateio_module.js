'use strict';

/* Module for ContasPagarRateio */

var contasPagarRateioModule = angular.module('contasPagarRateio.module', ['myApp']);

/**
 * Module for contasPagarRateio
 */
contasPagarRateioModule.config(['$routeProvider', function($routeProvider) {
    // Pages routes
    $routeProvider.when('/contasPagarRateio',    {templateUrl: 'partials/contaspagarrateio/contaspagarrateio_list.html', controller: 'ContasPagarRateioCtrl'});
    $routeProvider.when('/contasPagarRateio/new', {templateUrl: 'partials/contaspagarrateio/contaspagarrateio_form.html', controller: 'ContasPagarRateioCtrl'});
    $routeProvider.when('/contasPagarRateio/:oidContasPagarRateio', {templateUrl: 'partials/contaspagarrateio/contaspagarrateio_form.html', controller: 'ContasPagarRateioCtrl'});
}]);
