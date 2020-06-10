class HomeScene extends Phaser.Scene {
	constructor() {
		super("home");
	}

	preload () {
		this.load.image('home_screen', 'static/images/home/home_page.png');
		this.load.image('instructions', 'static/images/home/instruction_button.png');
		this.load.image('log_in', 'static/images/home/log_in_button.png');
		this.load.image('play', 'static/images/home/play_button.png');
		this.load.image('achievements', 'static/images/home/achievements_button.png');
		this.load.image('settings', 'static/images/home/settings_button.png');


		this.load.image('border', 'static/images/maps/border.png');

		this.load.image('popup', 'static/images/menus/popup.jpg')
		this.load.image('resume', 'static/images/menus/resume_button.jpg')
		this.load.image('retry', 'static/images/menus/retry_button.jpg')
		this.load.image('main_menu', 'static/images/menus/main_menu_button.jpg')
		this.load.image('next_level', 'static/images/menus/next_level.jpg')

		this.load.image('sidebar', 'static/images/maps/map_selection_sidebar.png')

		this.load.image('lives', 'static/images/menus/lives.png' );
		this.load.image('money', 'static/images/menus/money.png' );

		this.load.image('red_bloon', 'static/images/bloons/red_bloon.png');
		this.load.image('blue_bloon', 'static/images/bloons/blue_bloon.png');
		this.load.image('green_bloon', 'static/images/bloons/green_bloon.png');
		this.load.image('yellow_bloon', 'static/images/bloons/yellow_bloon.png');
		this.load.image('pink_bloon', 'static/images/bloons/pink_bloon.png');
		this.load.image('white_bloon', 'static/images/bloons/white_bloon.png');
		this.load.image('black_bloon', 'static/images/bloons/black_bloon.png');
		this.load.image('zebra_bloon', 'static/images/bloons/zebra_bloon.png');
		this.load.image('rainbow_bloon', 'static/images/bloons/rainbow_bloon.png');
		this.load.image('ceramic_bloon', 'static/images/bloons/ceramic_bloon.png');
		this.load.image('MOAB', 'static/images/bloons/MOAB.png');

		this.load.image('dart_monkey', 'static/images/towers/dart_monkey.png');
		this.load.image('monkey_buccaneer', 'static/images/towers/buccaneer.png');
		this.load.image('tack_shooter', 'static/images/towers/tack_shooter.png');
		this.load.image('ice_monkey', 'static/images/towers/ice_monkey.png');
		this.load.image('banana_farm', 'static/images/towers/banana_farm.png');
		this.load.image('super_monkey', 'static/images/towers/super_monkey.png');

		this.load.image('dart', 'static/images/projectiles/dart.png');
		this.load.image('bomb', 'static/images/projectiles/bomb.png');
		this.load.image('blizzard', 'static/images/projectiles/blizzard.png');
		this.load.image('banana', 'static/images/projectiles/banana.png');

		this.load.image('background', 'static/images/maps/map_selection.jpg');
		this.load.image('back', 'static/images/home/back_button.png')

		this.load.image('ocean_road', 'static/images/maps/ocean_road.png');
		this.load.image('floating_island', 'static/images/maps/floating_island.png');
		this.load.image('castlemania', 'static/images/maps/castlemania.png');
		this.load.image('lightning_scar', 'static/images/maps/lightning_scar.png');
		this.load.image('cubism', 'static/images/maps/cubism.png');
		this.load.image('scorched_earth', 'static/images/maps/scorched_earth.png');
	}

	create () {
		this.add.image(500, 300, 'home_screen').setDisplaySize(1000,600);
		this.place_buttons('instructions', 300, 500, .7, this.instructions_function, this);
		this.place_buttons('settings', 400, 525, .7, this.settings_function, this);
		this.place_buttons('play', 500, 540 , .9, this.play_function, this);
		this.place_buttons('log_in', 600, 525, .7, this.log_in_function, this);
		this.place_buttons('achievements', 700, 500, .7, this.achievements_function, this);
	}

	place_buttons(button_name, x, y, scale, button_function, scene){
		let button = this.add.image(x, y, button_name).setScale(scale);
		button.setInteractive();
        button.on('pointerdown', button_function, scene);
	}
	log_in_function(){
		window.location = '/login'
	}
	settings_function(){
		console.log("settings");
	}
	play_function(){
		this.scene.start('selection');
	}
	achievements_function(){
		window.location = '/leaderboard'
	}
	instructions_function(){
		console.log("here instructions");
	}
    update() {

    }
}
