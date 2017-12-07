var app = angular.module("app_test", [ 'ui.router' ]);

app.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/');

	$stateProvider.state('ingreso', {
		url : '/ingreso',
		templateUrl : 'views/ingreso.html',
		controller : 'ingreso_controlador',

	});

});

app.controller('controlador_principal', function($scope, $location) {
   $scope.cargar_ingreso = function(){
	   $location.path('/ingreso');
   }
});

app.controller('test_controlador', function() {

});
