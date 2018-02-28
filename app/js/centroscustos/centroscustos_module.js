'use strict';

/* Module for CentrosCustos */

var centrosCustosModule = angular.module('centrosCustos.module', ['myApp']);

/**
 * Module for centrosCustos
 */
centrosCustosModule.config(['$routeProvider', function($routeProvider) {
    // Pages routes
    $routeProvider.when('/centrosCustos',    {templateUrl: 'partials/centroscustos/centroscustos_list.html', controller: 'CentrosCustosCtrl'});
    $routeProvider.when('/centrosCustos/new', {templateUrl: 'partials/centroscustos/centroscustos_form.html', controller: 'CentrosCustosCtrl'});
    $routeProvider.when('/centrosCustos/:oidCentrosCustos', {templateUrl: 'partials/centroscustos/centroscustos_form.html', controller: 'CentrosCustosCtrl'});
}]);
