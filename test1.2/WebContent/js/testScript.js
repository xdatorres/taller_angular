var app = angular.module("app_test", [ 'ui.router', 'ngTable', 'oc.lazyLoad' ]);

app.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/');

	$stateProvider.state('formulario', {
		url : '/formulario',
		templateUrl : 'views/formulario.html',
		controller : 'formulario_controlador',
		resolve : {
			deps : function($ocLazyLoad) {
				return $ocLazyLoad.load([ 'js/test.js',
						'https://code.highcharts.com/highcharts.js',
						'https://cdnjs.cloudflare.com/ajax/libs/phaser/2.6.2/custom/phaser-arcade-physics.min.js'])
			}
		}
	});

});
app.controller('controlador_principal', function($scope, NgTableParams) {

});
app
		.controller(
				'formulario_controlador',
				function($scope, NgTableParams) {
					$scope.usuario = {};
					$scope.ingresando = true;

					$scope.usuarios = [];

					$scope.enviar_formulario = function() {
						if ($scope.usuario.primer_nombre == undefined
								|| $scope.usuario.primer_nombre.length == 0) {
							swal("Error", "Debe completar el nombre!", "error");
							return false;
						}
						if ($scope.usuario.apellido == undefined
								|| $scope.usuario.apellido.length == 0) {
							swal("Error", "Debe completar el apellido!",
									"error");
							return false;
						}
						if ($scope.usuario.rut == undefined
								|| $scope.usuario.rut.length == 0) {
							swal("Error", "Debe completar el rut!", "error");
							return false;
						}
						if ($scope.usuario.edad == undefined
								|| $scope.usuario.edad == null) {
							swal("Error", "Debe completar el edad!", "error");
							return false;
						}
						$scope.usuarios.push({
							primer_nombre : $scope.usuario.primer_nombre,
							apellido : $scope.usuario.apellido,
							rut : $scope.usuario.rut,
							edad : $scope.usuario.edad
						});

						$scope.ng_table = new NgTableParams({}, {
							dataset : $scope.usuarios
						});

						$scope.usuario = {};
						console.log($scope.usuarios.length);
						console.log($scope.usuarios);
					};

					$scope.cargar_edicion = function(usuario, index) {
						$scope.ingresando = false;
						$scope.usuario = {
							primer_nombre : usuario.primer_nombre,
							apellido : usuario.apellido,
							rut : usuario.rut,
							edad : usuario.edad,
							index : index
						}
					}

					/*
					 * $scope.editar = function(){ for(var i=0;i<$scope.usuarios.length;i++){
					 * var usuarioTemp = $scope.usuarios[i];
					 * if(usuarioTemp.id==$scope.usuario.id){
					 * usuarioTemp.primer_nombre = $scope.usuario.primer_nombre;
					 * usuarioTemp.apellido = $scope.usuario.apellido;
					 * usuarioTemp.rut = $scope.usuario.rut; } }; }
					 */

					$scope.editar = function(index) {
						var index = $scope.usuario.index;
						$scope.usuarios[index].primer_nombre = $scope.usuario.primer_nombre;
						$scope.usuarios[index].apellido = $scope.usuario.apellido;
						$scope.usuarios[index].rut = $scope.usuario.rut;
						$scope.usuarios[index].edad = $scope.usuario.edad;
					}

					$scope.eliminar = function(index) {
						swal(
								{
									title : "Está seguro de eliminar el ususario?",
									text : "El usuario será eliminado!",
									type : "warning",
									showCancelButton : true,
									confirmButtonClass : "btn-danger",
									confirmButtonText : "Yes, delete it!",
									cancelButtonText : "No, cancel plx!",
									closeOnConfirm : false,
									closeOnCancel : false
								},
								function(isConfirm) {
									if (isConfirm) {
										$scope.ingresando = true;
										$scope.usuario = {};
										$scope.usuarios.splice(index, 1);
										$scope.ng_table.reload();
										swal(
												"Borrado!",
												"El usuaario fue borrado correctamente.",
												"success");
									} else {
										swal("Cancelado",
												"EL usuario no fue eliminado",
												"error");
									}
								});
					}

					$scope.regresar = function() {
						$scope.usuario = {};
						$scope.ingresando = true;
					}
					
					
					

					var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

					function preload() {

					    game.load.image('space', 'img/espacio.jpg');
					    game.load.image('bullet', 'img/choripan.jpg');
					    game.load.image('ship', 'img/marciano.png');

					}

					var sprite;
					var cursors;

					var bullet;
					var bullets;
					var bulletTime = 0;

					function create() {

					    //  This will run in Canvas mode, so let's gain a little speed and display
					    game.renderer.clearBeforeRender = false;
					    game.renderer.roundPixels = true;

					    //  We need arcade physics
					    game.physics.startSystem(Phaser.Physics.ARCADE);

					    //  A spacey background
					    game.add.tileSprite(0, 0, game.width, game.height, 'space');

					    //  Our ships bullets
					    bullets = game.add.group();
					    bullets.enableBody = true;
					    bullets.physicsBodyType = Phaser.Physics.ARCADE;

					    //  All 40 of them
					    bullets.createMultiple(40, 'bullet');
					    bullets.setAll('anchor.x', 0.5);
					    bullets.setAll('anchor.y', 0.5);

					    //  Our player ship
					    sprite = game.add.sprite(300, 300, 'ship');
					    sprite.anchor.set(0.5);

					    //  and its physics settings
					    game.physics.enable(sprite, Phaser.Physics.ARCADE);

					    sprite.body.drag.set(100);
					    sprite.body.maxVelocity.set(200);

					    //  Game input
					    cursors = game.input.keyboard.createCursorKeys();
					    game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);

					}

					function update() {

					    if (cursors.up.isDown)
					    {
					        game.physics.arcade.accelerationFromRotation(sprite.rotation, 200, sprite.body.acceleration);
					    }
					    else
					    {
					        sprite.body.acceleration.set(0);
					    }

					    if (cursors.left.isDown)
					    {
					        sprite.body.angularVelocity = -300;
					    }
					    else if (cursors.right.isDown)
					    {
					        sprite.body.angularVelocity = 300;
					    }
					    else
					    {
					        sprite.body.angularVelocity = 0;
					    }

					    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
					    {
					        fireBullet();
					    }

					    screenWrap(sprite);

					    bullets.forEachExists(screenWrap, this);

					}

					function fireBullet () {

					    if (game.time.now > bulletTime)
					    {
					        bullet = bullets.getFirstExists(false);

					        if (bullet)
					        {
					            bullet.reset(sprite.body.x + 16, sprite.body.y + 16);
					            bullet.lifespan = 2000;
					            bullet.rotation = sprite.rotation;
					            game.physics.arcade.velocityFromRotation(sprite.rotation, 400, bullet.body.velocity);
					            bulletTime = game.time.now + 50;
					        }
					    }

					}

					function screenWrap (sprite) {

					    if (sprite.x < 0)
					    {
					        sprite.x = game.width;
					    }
					    else if (sprite.x > game.width)
					    {
					        sprite.x = 0;
					    }

					    if (sprite.y < 0)
					    {
					        sprite.y = game.height;
					    }
					    else if (sprite.y > game.height)
					    {
					        sprite.y = 0;
					    }

					}

					function render() {
					}

					
					

					Highcharts
							.chart(
									'container',
									{
										chart : {
											type : 'column'
										},
										title : {
											text : 'Monthly Average Rainfall'
										},
										subtitle : {
											text : 'Source: WorldClimate.com'
										},
										xAxis : {
											categories : [ 'Jan', 'Feb', 'Mar',
													'Apr', 'May', 'Jun', 'Jul',
													'Aug', 'Sep', 'Oct', 'Nov',
													'Dec' ],
											crosshair : true
										},
										yAxis : {
											min : 0,
											title : {
												text : 'Rainfall (mm)'
											}
										},
										tooltip : {
											headerFormat : '<span style="font-size:10px">{point.key}</span><table>',
											pointFormat : '<tr><td style="color:{series.color};padding:0">{series.name}: </td>'
													+ '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
											footerFormat : '</table>',
											shared : true,
											useHTML : true
										},
										plotOptions : {
											column : {
												pointPadding : 0.2,
												borderWidth : 0
											}
										},
										series : [
												{
													name : 'Tokyo',
													data : [ 49.9, 71.5, 106.4,
															129.2, 144.0,
															176.0, 135.6,
															148.5, 216.4,
															194.1, 95.6, 54.4 ]

												},
												{
													name : 'New York',
													data : [ 83.6, 78.8, 98.5,
															93.4, 106.0, 84.5,
															105.0, 104.3, 91.2,
															83.5, 106.6, 92.3 ]

												},
												{
													name : 'London',
													data : [ 48.9, 38.8, 39.3,
															41.4, 47.0, 48.3,
															59.0, 59.6, 52.4,
															65.2, 59.3, 51.2 ]

												},
												{
													name : 'Berlin',
													data : [ 42.4, 33.2, 34.5,
															39.7, 52.6, 75.5,
															57.4, 60.4, 47.6,
															39.1, 46.8, 51.1 ]

												} ]
									});

				});
