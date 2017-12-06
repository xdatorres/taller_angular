var app = angular.module("app_test", [ 'ui.router', 'ngTable', 'oc.lazyLoad' ]);

app.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/');

	$stateProvider.state('formulario', {
		url : '/formulario',
		templateUrl : 'views/formulario.html',
		controller : 'formulario_controlador',
	});
});
