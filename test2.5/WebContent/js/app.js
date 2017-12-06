var app = angular.module('app_test', []);

app.controller('controlador', function($scope, $http) {
	//$scope.usuarios=[];
	$scope.llamar_al_servidor = function() {
		// Simple GET request example:
		$http({
			method : 'POST',
			url : '/res_algo',
			data : {
				usuario : {
					nombre : 'Frank',
					apellido : 'Kismann',
					edad : 29
				}
			}
		}).then(function successCallback(response) {
			// this callback will be called asynchronously
			// when the response is available
			//alert(JSON.stringify(response.data));
			$scope.usuarios=response.data;
		}, function errorCallback(response) {
			// called asynchronously if an error occurs
			// or server returns response with an error status.
		});
	}
});
