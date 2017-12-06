var app = angular.module("app_test", [ 'ui.router' ]);

app.controller('controlador_principal', function($scope, $http) {
	$scope.ir_al_server = function() {
		// Simple GET request example:
		$http({
			method : 'POST',
			url : '/test_server',
			data : {
				usuario : {
					nombre : "Ricardo",
					apellido : "villarroel",
					edad : 29
				}
			}
		}).then(function successCallback(response) {
			alert(JSON.stringify(response.data));
		}, function errorCallback(response) {

		});
	}

});
