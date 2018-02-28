'use strict';

/* Module for Usuarios */

var usuariosModule = angular.module('usuarios.module', ['myApp']);

/**
 * Module for usuarios
 */
usuariosModule.config(['$routeProvider', function($routeProvider) {
    // Pages routes
    $routeProvider.when('/usuarios',    {templateUrl: 'partials/usuarios/usuarios_list.html', controller: 'UsuariosCtrl'});
    $routeProvider.when('/usuarios/new', {templateUrl: 'partials/usuarios/usuarios_form.html', controller: 'UsuariosCtrl'});
    $routeProvider.when('/usuarios/:oidUsuarios', {templateUrl: 'partials/usuarios/usuarios_form.html', controller: 'UsuariosCtrl'});
}]);
