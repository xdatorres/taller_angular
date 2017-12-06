var app = angular
		.module('app_test2', [ 'ngTable', 'ui.router', 'oc.lazyLoad' ]);

app
		.config(function($stateProvider, $urlRouterProvider) {
			$urlRouterProvider.otherwise('/');
			$stateProvider
					.state(
							'formulario',
							{
								url : '/formulario',
								templateUrl : 'views/formulario.html',
								// template:'Hola'
								controller : 'formulario_controlador',
								resolve : {
									deps : function($ocLazyLoad) {
										return $ocLazyLoad
												.load([
														'js/test.js',
														'https://code.highcharts.com/highcharts.js',
														'https://cdnjs.cloudflare.com/ajax/libs/phaser/2.6.2/phaser.min.js' ])
									}
								}
							});
		});

app.controller('controlador_principal', function() {
});
app.controller('formulario_controlador', function($scope, NgTableParams) {
	// Begin: gráfico
	Highcharts.chart('container', {

		title : {
			text : 'Mi primer gráfico'
		},

		xAxis : {
			tickInterval : 1
		},

		yAxis : {
			type : 'logarithmic',
			minorTickInterval : 0.1
		},

		tooltip : {
			headerFormat : '<b>{series.name}</b><br />',
			pointFormat : 'x = {point.x}, y = {point.y}'
		},

		series : [ {
			data : [ 1, 2, 4, 8, 16, 69, 32, 64, 128, 256, 512 ],
			pointStart : 1
		} ]
	});
	// End: gráfico

	// Begin: juego

	var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', {
		preload : preload,
		create : create,
		update : update,
		render : render
	});

	function preload() {

		game.load.image('space', 'img/espacio.jpg');
		game.load.image('bullet', 'img/misil.png');
		game.load.image('ship', 'img/nave.png');

	}

	var sprite;
	var cursors;

	var bullet;
	var bullets;
	var bulletTime = 0;

	function create() {

		// This will run in Canvas mode, so let's gain a little speed and
		// display
		game.renderer.clearBeforeRender = false;
		game.renderer.roundPixels = true;

		// We need arcade physics
		game.physics.startSystem(Phaser.Physics.ARCADE);

		// A spacey background
		game.add.tileSprite(0, 0, game.width, game.height, 'space');

		// Our ships bullets
		bullets = game.add.group();
		bullets.enableBody = true;
		bullets.physicsBodyType = Phaser.Physics.ARCADE;

		// All 40 of them
		bullets.createMultiple(40, 'bullet');
		bullets.setAll('anchor.x', 0.5);
		bullets.setAll('anchor.y', 0.5);

		// Our player ship
		sprite = game.add.sprite(300, 300, 'ship');
		sprite.anchor.set(0.5);

		// and its physics settings
		game.physics.enable(sprite, Phaser.Physics.ARCADE);

		sprite.body.drag.set(100);
		sprite.body.maxVelocity.set(200);

		// Game input
		cursors = game.input.keyboard.createCursorKeys();
		game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);

	}

	function update() {

		if (cursors.up.isDown) {
			game.physics.arcade.accelerationFromRotation(sprite.rotation, 200,
					sprite.body.acceleration);
		} else {
			sprite.body.acceleration.set(0);
		}

		if (cursors.left.isDown) {
			sprite.body.angularVelocity = -300;
		} else if (cursors.right.isDown) {
			sprite.body.angularVelocity = 300;
		} else {
			sprite.body.angularVelocity = 0;
		}

		if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			fireBullet();
		}

		screenWrap(sprite);

		bullets.forEachExists(screenWrap, this);

	}

	function fireBullet() {

		if (game.time.now > bulletTime) {
			bullet = bullets.getFirstExists(false);

			if (bullet) {
				bullet.reset(sprite.body.x + 16, sprite.body.y + 16);
				bullet.lifespan = 2000;
				bullet.rotation = sprite.rotation;
				game.physics.arcade.velocityFromRotation(sprite.rotation, 400,
						bullet.body.velocity);
				bulletTime = game.time.now + 50;
			}
		}

	}

	function screenWrap(sprite) {

		if (sprite.x < 0) {
			sprite.x = game.width;
		} else if (sprite.x > game.width) {
			sprite.x = 0;
		}

		if (sprite.y < 0) {
			sprite.y = game.height;
		} else if (sprite.y > game.height) {
			sprite.y = 0;
		}

	}

	function render() {
	}

	// End: juego
	$scope.editando = false;
	$scope.usuario = {};
	$scope.usuario_edicion = {};
	$scope.usuarios = [];
	$scope.ingresar_usuario = function() {
		if ($scope.usuario.nombre == undefined
				|| $scope.usuario.nombre.length == 0) {
			alert('Debe ingresar un nombre');
			return false;
		}
		if ($scope.usuario.apellido == undefined
				|| $scope.usuario.apellido.length == 0) {
			alert('Debe ingresar un nombre');
			return false;
		}
		if ($scope.usuario.rut == undefined || $scope.usuario.rut.length == 0) {
			alert('Debe ingresar un nombre');
			return false;
		}
		if ($scope.usuario.edad == undefined || $scope.usuario.edad == null) {
			alert('Debe ingresar un nombre');
			return false;
		}

		$scope.usuarios.push({
			nombre : $scope.usuario.nombre,
			apellido : $scope.usuario.apellido,
			rut : $scope.usuario.rut,
			edad : $scope.usuario.edad
		});

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
	};

	$scope.cargar_edicion = function(indice) {
		$scope.editando = true;
		$scope.usuario_edicion = $scope.usuarios[indice];
	};

	$scope.regresar = function() {
		$scope.editando = false;
	}
});