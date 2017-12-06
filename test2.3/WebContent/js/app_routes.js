var app = angular.module('app_test', [ 'ui.router' ]);

app.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/');
	$stateProvider.state('controlador_1', {
		url : '/controlador_1',
		templateUrl : 'views/controlador_1.html',
		// template:'Hola'
		controller : 'controlador_2'
	}).state('controlador_2', {
		url : '/controlador_2',
		templateUrl : 'views/controlador_2.html',
		// template:'Hola'
		controller : 'controlador_2'
	}).state('controlador_3', {
		url : '/controlador_3',
		templateUrl : 'views/controlador_3.html',
		// template:'Hola'
		controller : 'controlador_3'
	});
});