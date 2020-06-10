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
		this.instructions = [
			"Your goal is to stop the bloons (balloons) from reaching the end of the course.",
			"You can place towers by clicking on the tower you want and clicking them again on a placeable area.",
			"But you must make sure you have enough money for the tower.",
			"Money is gained 3 different ways: popping bloons, completing levels, and collecting bananas from banana farms placed down. ",
			"Some other things you can do are upgrading your towers, selling your towers, and going to the next level right away with the start button.",
			"Hotkeys:",
			"X to deselect a tower",
			"ESC to pause",
			"S to sell selected tower",
			"Once your lifepoints hit zero it's game over.",
			"Good Luck!"
		]
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
		let some = this.add.image(500, 300, 'popup').setScale(.4);
		// console.log(some.x - (some.width/2 * .4), some.y-(some.height/2 * .4))
		// let graphics = this.add.graphics({ fillStyle: { color: 0x000000 , alpha: .5} }).setDepth(2);
		// let rectangle = new Phaser.Geom.Rectangle(325, 150, 400, 300);
		// graphics.fillRectShape(rectangle);
		let down_btn = this.add.image(750, 450, 'play').setScale(.5).setInteractive();
		let up_btn = this.add.image(750, 150, 'play').setScale(.5).setInteractive();
		let back_btn = this.add.image(230, 142, 'back').setScale(.3).setInteractive();

		down_btn.rotation += Math.PI/2;
		up_btn.rotation -= Math.PI/2;

		var graphics = this.add.graphics();
	    graphics.fillStyle(0xffffff, 0);
		graphics.fillRect(325, 150, 400, 300);
		var mask = new Phaser.Display.Masks.GeometryMask(this, graphics);
		var text = this.add.text(375, 150, this.instructions, { fontFamily: 'Arial', color: 'brown', wordWrap: { width: 310 } }).setFontSize(25);
		text.setMask(mask);
		var zone = this.add.zone(325, 150, 400, 300).setInteractive();
		down_btn.on('pointerdown', function () {
	        text.y -= 10;
	        text.y = Phaser.Math.Clamp(text.y, -400, 300);
		});
		up_btn.on('pointerdown', function () {
	        text.y += 10;
	        text.y = Phaser.Math.Clamp(text.y, -400, 300);
		});
		back_btn.on('pointerdown', function () {
			some.destroy();
			down_btn.destroy();
			up_btn.destroy();
			mask.destroy();
			text.destroy();
			graphics.destroy();
			zone.destroy();
			back_btn.destroy();


		});
	}
    update() {

    }
}
