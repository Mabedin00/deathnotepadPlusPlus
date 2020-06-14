class HomeScene extends Phaser.Scene {
	constructor() {
		super("home");
	}

	preload () {
		this.load.image('home_screen', 'static/images/home/home_page.png');
		this.load.image('Instructions', 'static/images/home/instruction_button.png');
		this.load.image('Login', 'static/images/home/log_in_button.png');
		this.load.image('Play', 'static/images/home/play_button.png');
		this.load.image('Leaderboard', 'static/images/home/achievements_button.png');
		this.load.image('Settings', 'static/images/home/settings_button.png');

		this.load.image('border', 'static/images/maps/border.png');

		this.load.image('popup', 'static/images/menus/popup.jpg')
		this.load.image('resume', 'static/images/menus/resume_button.jpg')
		this.load.image('retry', 'static/images/menus/retry_button.jpg')
		this.load.image('main_menu', 'static/images/menus/main_menu_button.jpg')
		this.load.image('next_level', 'static/images/menus/next_level.jpg')
		this.load.image('fast_forward', 'static/images/menus/fast_forward.jpg')
		this.load.image('volume_bar', 'static/images/menus/volume_bar.png')
		this.load.image('slider', 'static/images/menus/slider.png')

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
		this.load.image('dartling_gun', 'static/images/towers/dartling_gun.png');


		this.load.image('dart', 'static/images/projectiles/dart.png');
		this.load.image('bomb', 'static/images/projectiles/bomb.png');
		this.load.image('blizzard', 'static/images/projectiles/blizzard.png');
		this.load.image('banana', 'static/images/projectiles/banana.png');
		this.load.image('spike_ball', 'static/images/projectiles/spike_ball.png');
		this.load.image('juggernaut', 'static/images/projectiles/juggernaut.png');
		this.load.image('fire', 'static/images/projectiles/fire.png');
		this.load.image('blade', 'static/images/projectiles/blade.png');
		this.load.image('grape', 'static/images/projectiles/grape.png');
		this.load.image('hook', 'static/images/projectiles/hook.png');

		this.load.image('background', 'static/images/maps/map_selection.jpg');
		this.load.image('back', 'static/images/home/back_button.png')

		this.load.image('ocean_road', 'static/images/maps/ocean_road.png');
		this.load.image('floating_island', 'static/images/maps/floating_island.png');
		this.load.image('castlemania', 'static/images/maps/castlemania.png');
		this.load.image('lightning_scar', 'static/images/maps/lightning_scar.png');
		this.load.image('cubism', 'static/images/maps/cubism.png');
		this.load.image('scorched_earth', 'static/images/maps/scorched_earth.png');

		this.load.audio('bloon_pop', 'static/audio/bloon_pop.mp3');
		this.load.audio('explosion', 'static/audio/explosion.mp3');

		this.load.image('dm_1_1', 'static/images/towers/Dart Monkey Upgrades/dart_monkey_path1_1.png');
		this.load.image('dm_1_2', 'static/images/towers/Dart Monkey Upgrades/dart_monkey_path1_2.png');
		this.load.image('dm_1_3', 'static/images/towers/Dart Monkey Upgrades/dart_monkey_path1_3.png');
		this.load.image('dm_1_4', 'static/images/towers/Dart Monkey Upgrades/dart_monkey_path1_4.png');
		this.load.image('dm_2_3', 'static/images/towers/Dart Monkey Upgrades/dart_monkey_path2_3.png');
		this.load.image('dm_2_4', 'static/images/towers/Dart Monkey Upgrades/dart_monkey_path2_4.png');
	}

	create () {
		scene = this;

	 	esc_key = this.input.keyboard.addKey('ESC');

		this.add.image(500, 300, 'home_screen').setDisplaySize(1000,600);
		this.place_buttons('Instructions', 300, 500, .7, this.instructions_function, this);
		this.place_buttons('Settings', 400, 525, .7, this.settings_function, this);
		this.place_buttons('Play', 500, 540 , .9, this.play_function, this);
		this.place_buttons('Login', 600, 525, .7, this.login_function, this);
		this.place_buttons('Leaderboard', 700, 500, .7, this.achievements_function, this);
		this.instructions = [
			"To place a tower: click once on a tower, then click the desired location \n",
			"To select a tower, click on it\n",
			"To start the next level, click the green button with a single arrow \n",
			"To fast forward, click the button with the triple arrow \n",
			"Hotkeys:",
			"X to deselect a tower",
			"ESC to pause",
			"S to sell selected tower",
		]
	}

	place_buttons(button_name, x, y, scale, button_function, scene){
		let button = this.add.image(x, y, button_name).setScale(scale);
		button.setInteractive();
		button.text = button_name;
        button.on('pointerdown', button_function, scene);
		button.on('pointerover', this.display_info, button);
		button.on('pointerout', this.hide_info, button);
	}


	display_info() {
		this.display_text = scene.add.text(this.x, this.y - 50, this.text, {
			backgroundColor: 'black',
			color: 'white',
			font: 'bold 18px Arial',
			wordWrap: { width: 125 }
		});
		this.display_text.setDepth(5).setPadding(3, 3);
		this.setTint(0xbecafe)
	}

	hide_info() {
		this.display_text.destroy();
		this.clearTint();
	}

	login_function(){
		window.location = '/login'
	}
	settings_function(){
		const LOWER_BOUND = 380;
		const UPPER_BOUND = 620;

		let some = this.add.image(500, 300, 'popup').setScale(.4).setDepth(2);
		this.create_border(some, 'black', .8, 10, 1);
		let bgm_bar = this.add.image(615, 275, 'volume_bar').setScale(2).setDepth(2);
		let sfx_bar = this.add.image(615, 400, 'volume_bar').setScale(2).setDepth(2);
		let bgm_text = this.add.text(300, 230, 'BGM: ', {color: 'black', font: '24px Arial'}).setDepth(2)
		let sfx_text = this.add.text(300, 355, 'SFX: ', {color: 'black', font: '24px Arial'}).setDepth(2)
		let bgm_slider = this.add.image(bgm_x_coor, 245, 'slider').setDepth(2).setInteractive();
		let sfx_slider = this.add.image(sfx_x_coor, 370, 'slider').setDepth(2).setInteractive();
		this.input.setDraggable(bgm_slider);
		this.input.setDraggable(sfx_slider);

		bgm_slider.on('drag', function() {
			let mouseX = Math.floor(scene.input.activePointer.x);
	        this.x = mouseX;
			bgm = (bgm_slider.x - LOWER_BOUND) / (UPPER_BOUND - LOWER_BOUND);
			bgm_x_coor = bgm_slider.x;
			if (this.x >= UPPER_BOUND) this.x = UPPER_BOUND
			if (this.x <= LOWER_BOUND) this.x = LOWER_BOUND
		});
		sfx_slider.on('drag', function() {
			let mouseX = Math.floor(scene.input.activePointer.x);
	        this.x = mouseX;
			if (this.x >= UPPER_BOUND) this.x = UPPER_BOUND
			if (this.x <= LOWER_BOUND) this.x = LOWER_BOUND
			sfx = (sfx_slider.x - LOWER_BOUND) / (UPPER_BOUND - LOWER_BOUND);
			sfx_x_coor = sfx_slider.x
		});

		let back_btn = this.add.image(230, 142, 'back').setScale(.3).setInteractive().setDepth(2);
		back_btn.on('pointerdown', function () {
			scene.scene.restart();
			// some.graphics.destroy();
			// some.destroy();
			// back_btn.destroy();
			// bgm_bar.destroy();
			// sfx_bar.destroy();
			// bgm_text.destroy();
			// sfx_text.destroy();
			// bgm_slider.destroy();
			// sfx_slider.destroy();
		});
		back_btn.on('pointerover', function() {this.setTint(0xbecafe)})
		back_btn.on('pointerout', function() {this.clearTint()})

	}
	play_function(){
		this.scene.start('selection');
	}
	achievements_function(){
		window.location = '/leaderboard'
	}
	instructions_function(){
		let some = this.add.image(500, 300, 'popup').setScale(.4).setDepth(2);
		this.create_border(some, 'black', .8, 10, 1)
		let down_btn = this.add.image(750, 430, 'Play').setScale(.5).setInteractive().setDepth(2);
		let up_btn = this.add.image(750, 170, 'Play').setScale(.5).setInteractive().setDepth(2);
		let back_btn = this.add.image(230, 142, 'back').setScale(.3).setInteractive().setDepth(2);

		down_btn.rotation += Math.PI/2;
		up_btn.rotation -= Math.PI/2;

		var graphics = this.add.graphics();
	    graphics.fillStyle(0xffffff, 0);
		graphics.fillRect(325, 150, 400, 300);
		var mask = new Phaser.Display.Masks.GeometryMask(this, graphics);
		var text = this.add.text(375, 150, this.instructions, { fontFamily: 'Arial', color: 'black', wordWrap: { width: 310 } }).setFontSize(25).setDepth(2);
		text.setMask(mask);
		down_btn.on('pointerdown', function () {
	        text.y -= 200;
	        text.y = Phaser.Math.Clamp(text.y, -50, 350);
		});
		down_btn.on('pointerover', function() {this.setTint(0xbecafe)})
		down_btn.on('pointerout', function() {this.clearTint()})

		up_btn.on('pointerdown', function () {
	        text.y += 200;
	        text.y = Phaser.Math.Clamp(text.y, -200, 150)
		});
		up_btn.on('pointerover', function() {this.setTint(0xbecafe)})
		up_btn.on('pointerout', function() {this.clearTint()})

		back_btn.on('pointerdown', function () {
			scene.scene.restart();
			// some.destroy();
			// down_btn.destroy();
			// up_btn.destroy();
			// some.graphics.destroy();
			// mask.destroy();
			// text.destroy();
			// graphics.destroy();
			// back_btn.destroy();
		});
		back_btn.on('pointerover', function() {this.setTint(0xbecafe)})
		back_btn.on('pointerout', function() {this.clearTint()})
	}

	create_border(element, color, alpha, border, depth) {
		element.graphics = this.add.graphics({ fillStyle: { color: color , alpha: alpha} });
		let rectangle = new Phaser.Geom.Rectangle(
			element.x - element.displayWidth/2  - border/2,
			element.y - element.displayHeight/2 - border/2,
			element.displayWidth  + border,
			element.displayHeight + border);
		element.graphics.fillRectShape(rectangle).setDepth(depth);
	}

	update() {
		if (esc_key.isDown) this.scene.restart();
	}
}
