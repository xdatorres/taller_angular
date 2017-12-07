var app = angular.module("app_test", [ 'ui.router', 'ngTable', 'oc.lazyLoad' ]);

app
		.config(function($stateProvider, $urlRouterProvider) {
			$urlRouterProvider.otherwise('/');

			$stateProvider
					.state(
							'formulario',
							{
								url : '/formulario',
								templateUrl : 'views/formulario.html',
								controller : 'formulario_controlador',
								resolve : {
									deps : function($ocLazyLoad) {
										return $ocLazyLoad
												.load([ 'https://cdnjs.cloudflare.com/ajax/libs/phaser/2.6.2/custom/phaser-arcade-physics.min.js' ])
									}
								}
							});

		});
app.controller('controlador_principal', function($scope, NgTableParams) {

});
app.controller('formulario_controlador', function($scope, NgTableParams,
		calcula_total) {
	$scope.repuesto = {};
	$scope.ingresando = true;

	$scope.repuestos = [];

	$scope.enviar_formulario = function() {
		if ($scope.repuesto.marca == undefined
				|| $scope.repuesto.marca.length == 0) {
			swal("Error", "Debe completar la Marca!", "error");
			return false;
		}
		if ($scope.repuesto.modelo == undefined
				|| $scope.repuesto.modelo.length == 0) {
			swal("Error", "Debe completar el Modelo!", "error");
			return false;
		}
		if ($scope.repuesto.repuesto == undefined
				|| $scope.repuesto.repuesto.length == 0) {
			swal("Error", "Debe completar el Repuesto!", "error");
			return false;
		}
		if ($scope.repuesto.precio == undefined
				|| $scope.repuesto.precio == null) {
			swal("Error", "Debe completar el Precio!", "error");
			return false;
		}
		if ($scope.repuesto.cantidad == undefined
				|| $scope.repuesto.cantidad == null) {
			swal("Error", "Debe completar la Cantidad!", "error");
			return false;
		}
		$scope.repuestos.push({
			marca : $scope.repuesto.marca,
			modelo : $scope.repuesto.modelo,
			repuesto : $scope.repuesto.repuesto,
			precio : $scope.repuesto.precio,
			cantidad : $scope.repuesto.cantidad,
			total : $scope.repuesto.precio * $scope.repuesto.cantidad
		});

		$scope.totalGral = calcula_total.sumar($scope.repuestos);

		$scope.ng_table = new NgTableParams({}, {
			dataset : $scope.repuestos
		});

		$scope.repuesto = {};
		console.log($scope.repuestos.length);
		console.log($scope.repuestos);
	};

	$scope.cargar_edicion = function(repuesto, index) {
		$scope.ingresando = false;
		$scope.repuesto = {
			marca : repuesto.marca,
			modelo : repuesto.modelo,
			repuesto : repuesto.repuesto,
			precio : repuesto.precio,
			cantidad : repuesto.cantidad,
			index : index
		}
	}

	$scope.editar = function(index) {
		var index = $scope.repuesto.index;
		$scope.repuestos[index].marca = $scope.repuesto.marca;
		$scope.repuestos[index].modelo = $scope.repuesto.modelo;
		$scope.repuestos[index].repuesto = $scope.repuesto.repuesto;
		$scope.repuestos[index].precio = $scope.repuesto.precio;
		$scope.repuestos[index].cantidad = $scope.repuesto.cantidad;
	}

	$scope.eliminar = function(index) {
		swal({
			title : "Está seguro de eliminar el repuesto?",
			text : "El repuesto será eliminado!",
			type : "warning",
			showCancelButton : true,
			confirmButtonClass : "btn-danger",
			confirmButtonText : "Sí, será borrado!",
			cancelButtonText : "No, cancela!",
			closeOnConfirm : false,
			closeOnCancel : false
		}, function(isConfirm) {
			if (isConfirm) {
				$scope.ingresando = true;
				$scope.repuesto = {};
				$scope.repuestos.splice(index, 1);
				$scope.ng_table.reload();
				swal("Borrado!", "El repuesto fue borrado correctamente.",
						"success");
			} else {
				swal("Cancelado", "EL repuesto no fue eliminado", "error");
			}
		});
	}

	$scope.regresar = function() {
		$scope.repuesto = {};
		$scope.ingresando = true;
	}

});

app.factory('calcula_total', function() {
	return {
		total : 0,
		sumar : function(repuesto) {
			this.total = 0;
			for (var i = 0; i < repuesto.length; i++) {
				this.total += repuesto[i].total;
			}
			return (this.total);
		}
	}
})
