'use strict';

/* Module for TiposTitulos */

var tiposTitulosModule = angular.module('tiposTitulos.module', ['myApp']);

/**
 * Module for tiposTitulos
 */
tiposTitulosModule.config(['$routeProvider', function($routeProvider) {
    // Pages routes
    $routeProvider.when('/tiposTitulos',    {templateUrl: 'partials/tipostitulos/tipostitulos_list.html', controller: 'TiposTitulosCtrl'});
    $routeProvider.when('/tiposTitulos/new', {templateUrl: 'partials/tipostitulos/tipostitulos_form.html', controller: 'TiposTitulosCtrl'});
    $routeProvider.when('/tiposTitulos/:oidTiposTitulos', {templateUrl: 'partials/tipostitulos/tipostitulos_form.html', controller: 'TiposTitulosCtrl'});
}]);
