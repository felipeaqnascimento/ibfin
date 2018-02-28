'use strict';

/* Module for Pessoas */

var pessoasModule = angular.module('pessoas.module', ['myApp']);

/**
 * Module for pessoas
 */
pessoasModule.config(['$routeProvider', function($routeProvider) {
    // Pages routes
    $routeProvider.when('/pessoas',    {templateUrl: 'partials/pessoas/pessoas_list.html', controller: 'PessoasCtrl'});
    $routeProvider.when('/pessoas/new', {templateUrl: 'partials/pessoas/pessoas_form.html', controller: 'PessoasCtrl'});
    $routeProvider.when('/pessoas/:oidPessoas', {templateUrl: 'partials/pessoas/pessoas_form.html', controller: 'PessoasCtrl'});
    
    $routeProvider.when('/pessoasFornec',    {templateUrl: 'partials/pessoas/pessoasFornec/pessoasFornec_list.html', controller: 'PessoasCtrl'});
    $routeProvider.when('/pessoas/pessoasFornec/new', {templateUrl: 'partials/pessoas/pessoasFornec/pessoasFornec_form.html', controller: 'PessoasCtrl'});
    $routeProvider.when('/pessoas/pessoasFornec/:oidPessoas', {templateUrl: 'partials/pessoas/pessoasFornec/pessoasFornec_form.html', controller: 'PessoasCtrl'});
}]);
