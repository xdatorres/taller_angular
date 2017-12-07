var app = angular.module('app_oll', [ 'ngTable', 'ui.router', 'oc.lazyLoad' ]);

app.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/');
	$stateProvider.state('formulario', {
		url : '/formulario',
		templateUrl : 'views/formulario.html',
		controller : 'formulario_controlador'
	});
});

app.controller('controlador_principal', function() {
});
app
		.controller(
				'formulario_controlador',
				function($scope, cubo_factoria, NgTableParams) {

					$scope.editando = false;
					$scope.usuario = {};
					$scope.usuario_edicion = {};
					$scope.usuarios = [];

					$scope.usuario.cubo = cubo_factoria.init();
					$scope.usuario.cubo_save =  cubo_factoria.init_empty();

					$scope.test = function(user, indice, fila) {
						// $("#"+indice + "," + fila).html('');
						// console.log("#"+indice + "_" + fila);
						if (user.cubo_save[indice][fila] == "1") {
							document.getElementById(indice + "_" + fila).style = "background-color: white"
							user.cubo_save[indice][fila] = "0";
						} else {
							document.getElementById(indice + "_" + fila).style = "background-color: black";
							user.cubo_save[indice][fila] = "1";
						}

						/*if ($scope.usuario_edicion.cubo_save[indice][fila] == "1") {
							document.getElementById(indice + "_" + fila).style = "background-color: white"
							$scope.usuario_edicion.cubo_save[indice][fila] = "0";
						} else {
							document.getElementById(indice + "_" + fila).style = "background-color: black";
							$scope.usuario_edicion.cubo_save[indice][fila] = "1";
						}*/

					}
					
					$scope.ingresar_usuario = function() {
						if ($scope.usuario.movimiento == undefined
								|| $scope.usuario.movimiento.length == 0) {
							alert('Debe ingresar un movimiento');
							return false;
						}
						
						
						
						var estilo_aa = '';
						var estilo_ab = '';
						var estilo_ac = '';
						var estilo_ba = '';
						var estilo_bb = '';
						var estilo_bc = '';
						var estilo_ca = '';
						var estilo_cb = '';
						var estilo_cc = '';
						
						if($scope.usuario.cubo_save[0][0]=="1"){							
							estilo_aa = 'black';
						}
						if($scope.usuario.cubo_save[0][1]=="1"){							
							estilo_ab = 'black';
						}
						if($scope.usuario.cubo_save[0][2]=="1"){							
							estilo_ac = 'black';
						}
						if($scope.usuario.cubo_save[1][0]=="1"){							
							estilo_ba = 'black';
						}
						if($scope.usuario.cubo_save[1][1]=="1"){							
							estilo_bb = 'black';
						}
						if($scope.usuario.cubo_save[1][2]=="1"){							
							estilo_bc = 'black';
						}
						if($scope.usuario.cubo_save[2][0]=="1"){							
							estilo_ca = 'black';
						}
						if($scope.usuario.cubo_save[2][1]=="1"){							
							estilo_cb = 'black';
						}
						if($scope.usuario.cubo_save[2][2]=="1"){							
							estilo_cc = 'black';
						}

						$scope.usuarios.push({
							movimiento : $scope.usuario.movimiento,
							cubo_save: $scope.usuario.cubo_save,
							id: $scope.usuarios.length,
							estilo:{
								'AA':{'background-color':estilo_aa},
								'AB':{'background-color':estilo_ab},
								'AC':{'background-color':estilo_ac},
								
								'BA':{'background-color':estilo_ba},
								'BB':{'background-color':estilo_bb},
								'BC':{'background-color':estilo_bc},
								
								'CA':{'background-color':estilo_ca},
								'CB':{'background-color':estilo_cb},
								'CC':{'background-color':estilo_cc},
							}
								
						});
						
						var cuadrado = $scope.usuarios[$scope.usuarios.length-1];
						

						$scope.ng_table = new NgTableParams({}, {
							dataset : $scope.usuarios
						});
						console.log($scope.usuarios);
						// $scope.usuario={};
					};

					$scope.eliminar = function(indice) {
						$scope.usuarios.splice(indice, 1);
						$scope.usuario_edicion = {};
						$scope.ng_table.reload();
						$scope.editando = false;
					};

					$scope.cargar_edicion = function(indice) {
						$scope.editando = true;
						$scope.usuario_edicion = $scope.usuarios[indice];
					};

					$scope.regresar = function() {
						$scope.editando = false;
					}
				});