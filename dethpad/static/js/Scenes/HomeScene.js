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

		this.load.image('red_bloon_camo', 'static/images/bloons/red_bloon_camo.png');
		this.load.image('blue_bloon_camo', 'static/images/bloons/blue_bloon_camo.png');
		this.load.image('green_bloon_camo', 'static/images/bloons/green_bloon_camo.png');
		this.load.image('yellow_bloon_camo', 'static/images/bloons/yellow_bloon_camo.png');
		this.load.image('pink_bloon_camo', 'static/images/bloons/pink_bloon_camo.png');
		this.load.image('white_bloon_camo', 'static/images/bloons/white_bloon_camo.png');
		this.load.image('black_bloon_camo', 'static/images/bloons/black_bloon_camo.png');
		this.load.image('zebra_bloon_camo', 'static/images/bloons/zebra_bloon_camo.png');
		this.load.image('rainbow_bloon_camo', 'static/images/bloons/rainbow_bloon_camo.png');
		this.load.image('ceramic_bloon_camo', 'static/images/bloons/ceramic_bloon_camo.png');

		this.load.image('red_bloon_regen', 'static/images/bloons/red_bloon_regen.png');
		this.load.image('blue_bloon_regen', 'static/images/bloons/blue_bloon_regen.png');
		this.load.image('green_bloon_regen', 'static/images/bloons/green_bloon_regen.png');
		this.load.image('yellow_bloon_regen', 'static/images/bloons/yellow_bloon_regen.png');
		this.load.image('pink_bloon_regen', 'static/images/bloons/pink_bloon_regen.png');
		this.load.image('white_bloon_regen', 'static/images/bloons/white_bloon_regen.png');
		this.load.image('black_bloon_regen', 'static/images/bloons/black_bloon_regen.png');
		this.load.image('zebra_bloon_regen', 'static/images/bloons/zebra_bloon_regen.png');
		this.load.image('rainbow_bloon_regen', 'static/images/bloons/rainbow_bloon_regen.png');
		this.load.image('ceramic_bloon_regen', 'static/images/bloons/ceramic_bloon_regen.png');

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
		this.load.image('monkey_ace', 'static/images/towers/monkey_ace.png');

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
		this.load.image('ice', 'static/images/projectiles/ice_spike.png');
		this.load.image('sm_laser', 'static/images/projectiles/sm_lasers.png');
		this.load.image('plasma', 'static/images/projectiles/plasma.png');
		this.load.image('sg_blast', 'static/images/projectiles/sun_god_blast.png');
		this.load.image('temple_blast', 'static/images/projectiles/temple_blast.png');
		this.load.image('tech_blast', 'static/images/projectiles/tech_blast.png');
		this.load.image('box', 'static/images/projectiles/banana_box.png');
		this.load.image('dg_laser', 'static/images/projectiles/dg_laser.png');
		this.load.image('rocket', 'static/images/projectiles/dg_rocket.png');
		this.load.image('rod', 'static/images/projectiles/dg_beam.png');

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

		this.load.image('dm_1_1_icon', 'static/images/upgrades/dm_1_1.png');
		this.load.image('dm_1_2_icon', 'static/images/upgrades/dm_1_2.png');
		this.load.image('dm_1_3_icon', 'static/images/upgrades/dm_1_3.png');
		this.load.image('dm_1_4_icon', 'static/images/upgrades/dm_1_4.png');
		this.load.image('dm_2_1_icon', 'static/images/upgrades/dm_2_1.png');
		this.load.image('dm_2_2_icon', 'static/images/upgrades/dm_2_2.png');
		this.load.image('dm_2_3_icon', 'static/images/upgrades/dm_2_3.png');
		this.load.image('dm_2_4_icon', 'static/images/upgrades/dm_2_4.png');

		this.load.image('ts_1_1', 'static/images/towers/Tack Shooter Upgrades/tack_shooter_path1_1.png');
		this.load.image('ts_1_2', 'static/images/towers/Tack Shooter Upgrades/tack_shooter_path1_2.png');
		this.load.image('ts_1_3', 'static/images/towers/Tack Shooter Upgrades/tack_shooter_path1_3.png');
		this.load.image('ts_1_4', 'static/images/towers/Tack Shooter Upgrades/tack_shooter_path1_4.png');
		this.load.image('ts_2_3', 'static/images/towers/Tack Shooter Upgrades/tack_shooter_path2_3.png');
		this.load.image('ts_2_4', 'static/images/towers/Tack Shooter Upgrades/tack_shooter_path2_4.png');

		this.load.image('ts_1_1_icon', 'static/images/upgrades/ts_1_1.png');
		this.load.image('ts_1_2_icon', 'static/images/upgrades/ts_1_2.png');
		this.load.image('ts_1_3_icon', 'static/images/upgrades/ts_1_3.png');
		this.load.image('ts_1_4_icon', 'static/images/upgrades/ts_1_4.png');
		this.load.image('ts_2_1_icon', 'static/images/upgrades/ts_2_1.png');
		this.load.image('ts_2_2_icon', 'static/images/upgrades/ts_2_2.png');
		this.load.image('ts_2_3_icon', 'static/images/upgrades/ts_2_3.png');
		this.load.image('ts_2_4_icon', 'static/images/upgrades/ts_2_4.png');

		this.load.image('b_1_1', 'static/images/towers/Buccaneer Upgrades/buccaneer_path1_1.png');
		this.load.image('b_1_2', 'static/images/towers/Buccaneer Upgrades/buccaneer_path1&2_2.png');
		this.load.image('b_1_3', 'static/images/towers/Buccaneer Upgrades/buccaneer_path1_3.png');
		this.load.image('b_1_4', 'static/images/towers/Buccaneer Upgrades/buccaneer_path1_4.png');
		this.load.image('b_2_1', 'static/images/towers/Buccaneer Upgrades/buccaneer_path2_1.png');
		this.load.image('b_2_3', 'static/images/towers/Buccaneer Upgrades/buccaneer_path2_3.png');
		this.load.image('b_2_4', 'static/images/towers/Buccaneer Upgrades/buccaneer_path2_4.png');

		this.load.image('b_1_1_icon', 'static/images/upgrades/b_1_1.png');
		this.load.image('b_1_2_icon', 'static/images/upgrades/b_1_2.png');
		this.load.image('b_1_3_icon', 'static/images/upgrades/b_1_3.png');
		this.load.image('b_1_4_icon', 'static/images/upgrades/b_1_4.png');
		this.load.image('b_2_1_icon', 'static/images/upgrades/b_2_1.png');
		this.load.image('b_2_2_icon', 'static/images/upgrades/b_2_2.png');
		this.load.image('b_2_3_icon', 'static/images/upgrades/b_2_3.png');
		this.load.image('b_2_4_icon', 'static/images/upgrades/b_2_4.png');


		this.load.image('im_1_1', 'static/images/towers/Ice Monkey Upgrades/ice_monkey_path1_1.png');
		this.load.image('im_1_2', 'static/images/towers/Ice Monkey Upgrades/ice_monkey_path1_2.png');
		this.load.image('im_1_3', 'static/images/towers/Ice Monkey Upgrades/ice_monkey_path1_3.png');
		this.load.image('im_1_4', 'static/images/towers/Ice Monkey Upgrades/ice_monkey_path1_4.png');
		this.load.image('im_2_3', 'static/images/towers/Ice Monkey Upgrades/ice_monkey_path2_3.png');
		this.load.image('im_2_4', 'static/images/towers/Ice Monkey Upgrades/ice_monkey_path2_4.png');

		this.load.image('im_1_1_icon', 'static/images/upgrades/im_1_1.png');
		this.load.image('im_1_2_icon', 'static/images/upgrades/im_1_2.png');
		this.load.image('im_1_3_icon', 'static/images/upgrades/im_1_3.png');
		this.load.image('im_1_4_icon', 'static/images/upgrades/im_1_4.png');
		this.load.image('im_2_1_icon', 'static/images/upgrades/im_2_1.png');
		this.load.image('im_2_2_icon', 'static/images/upgrades/im_2_2.png');
		this.load.image('im_2_3_icon', 'static/images/upgrades/im_2_3.png');
		this.load.image('im_2_4_icon', 'static/images/upgrades/im_2_4.png');

		this.load.image('bf_1_1', 'static/images/towers/Banana Farm/banana_farm_path1_1.png');
		this.load.image('bf_1_2', 'static/images/towers/Banana Farm/banana_farm_path1_2.png');
		this.load.image('bf_1_3', 'static/images/towers/Banana Farm/banana_farm_path1_3.png');
		this.load.image('bf_1_4', 'static/images/towers/Banana Farm/banana_farm_path1_4.png');
		this.load.image('bf_2_3', 'static/images/towers/Banana Farm/banana_farm_path2_3.png');
		this.load.image('bf_2_4', 'static/images/towers/Banana Farm/banana_farm_path2_4.png');

		this.load.image('bf_1_1_icon', 'static/images/upgrades/bf_1_1.png');
		this.load.image('bf_1_2_icon', 'static/images/upgrades/bf_1_2.png');
		this.load.image('bf_1_3_icon', 'static/images/upgrades/bf_1_3.png');
		this.load.image('bf_1_4_icon', 'static/images/upgrades/bf_1_4.png');
		this.load.image('bf_2_1_icon', 'static/images/upgrades/bf_2_1.png');
		this.load.image('bf_2_2_icon', 'static/images/upgrades/bf_2_2.png');
		this.load.image('bf_2_3_icon', 'static/images/upgrades/bf_2_3.png');
		this.load.image('bf_2_4_icon', 'static/images/upgrades/bf_2_4.png');

		this.load.image('sm_1_1', 'static/images/towers/Super Monkey Upgrades/super_monkey_path1_1.png');
		this.load.image('sm_1_2', 'static/images/towers/Super Monkey Upgrades/super_monkey_path1_2.png');
		this.load.image('sm_1_3', 'static/images/towers/Super Monkey Upgrades/super_monkey_path1_3.png');
		this.load.image('sm_1_4', 'static/images/towers/Super Monkey Upgrades/super_monkey_path1_4.png');
		this.load.image('sm_2_2', 'static/images/towers/Super Monkey Upgrades/super_monkey_path2_2.png');
		this.load.image('sm_2_3', 'static/images/towers/Super Monkey Upgrades/super_monkey_path2_3.png');
		this.load.image('sm_2_4', 'static/images/towers/Super Monkey Upgrades/super_monkey_path2_4.png');

		this.load.image('sm_1_1_icon', 'static/images/upgrades/sm_1_1.png');
		this.load.image('sm_1_2_icon', 'static/images/upgrades/sm_1_2.png');
		this.load.image('sm_1_3_icon', 'static/images/upgrades/sm_1_3.png');
		this.load.image('sm_1_4_icon', 'static/images/upgrades/sm_1_4.png');
		this.load.image('sm_2_1_icon', 'static/images/upgrades/sm_2_1.png');
		this.load.image('sm_2_2_icon', 'static/images/upgrades/sm_2_2.png');
		this.load.image('sm_2_3_icon', 'static/images/upgrades/sm_2_3.png');
		this.load.image('sm_2_4_icon', 'static/images/upgrades/sm_2_4.png');

		this.load.image('dg_1_1', 'static/images/towers/Dartling Gun Upgrades/dartling_gun_path1_1.png');
		this.load.image('dg_1_2', 'static/images/towers/Dartling Gun Upgrades/dartling_gun_path1_2.png');
		this.load.image('dg_1_3', 'static/images/towers/Dartling Gun Upgrades/dartling_gun_path1_3.png');
		this.load.image('dg_1_4', 'static/images/towers/Dartling Gun Upgrades/dartling_gun_path1_4.png');
		this.load.image('dg_2_2', 'static/images/towers/Dartling Gun Upgrades/dartling_gun_path2_2.png');
		this.load.image('dg_2_3', 'static/images/towers/Dartling Gun Upgrades/dartling_gun_path2_3.png');
		this.load.image('dg_2_4', 'static/images/towers/Dartling Gun Upgrades/dartling_gun_path2_4.png');

		this.load.image('dg_1_1_icon', 'static/images/upgrades/dg_1_1.png');
		this.load.image('dg_1_2_icon', 'static/images/upgrades/dg_1_2.png');
		this.load.image('dg_1_3_icon', 'static/images/upgrades/dg_1_3.png');
		this.load.image('dg_1_4_icon', 'static/images/upgrades/dg_1_4.png');
		this.load.image('dg_2_1_icon', 'static/images/upgrades/dg_2_1.png');
		this.load.image('dg_2_2_icon', 'static/images/upgrades/dg_2_2.png');
		this.load.image('dg_2_3_icon', 'static/images/upgrades/dg_2_3.png');
		this.load.image('dg_2_4_icon', 'static/images/upgrades/dg_2_4.png');


		// LOADING BAR
		var progressBar = this.add.graphics();
		var progressBox = this.add.graphics();
		progressBox.fillStyle(0x222222, 0.8);
		progressBox.fillRect(281, 300, 420, 50);
		var width = this.cameras.main.width;
		var height = this.cameras.main.height;
		var loadingText = this.make.text({
		    x: width / 2,
		    y: height / 2 - 50,
		    text: 'Loading...',
		    style: {
		        font: '20px monospace',
		        fill: '#ffffff'
		    }
		});
		loadingText.setOrigin(0.5, 0.5);
		var percentText = this.make.text({
		    x: width / 2,
		    y: height / 2 + 25,
		    text: '0%',
		    style: {
		        font: '18px monospace',
		        fill: '#ffffff'
		    }
		});
		percentText.setOrigin(0.5, 0.5);
		var assetText = this.make.text({
		    x: width / 2,
		    y: height / 2 + 100,
		    text: '',
		    style: {
		        font: '18px monospace',
		        fill: '#ffffff'
		    }
		});
		assetText.setOrigin(0.5, 0.5);
		let useful_tip = useful_tips[Math.floor(Math.random() * useful_tips.length)];
		this.load.on('progress', function (value) {
			progressBar.clear();
		    progressBar.fillStyle(0xffffff, 1);
		    progressBar.fillRect(281, 300, 420 * value, 50);
			percentText.setText(parseInt(value * 100) + '%');
			assetText.setText('Tip: ' + useful_tip);
		});

		this.load.on('complete', function () {
			progressBar.destroy();
			progressBox.destroy();
			loadingText.destroy();
			percentText.destroy();
		});
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
		let bgm_slider = this.add.image(LOWER_BOUND + bgm * (UPPER_BOUND-LOWER_BOUND), 245, 'slider').setDepth(2).setInteractive();
		let sfx_slider = this.add.image(LOWER_BOUND + sfx * (UPPER_BOUND-LOWER_BOUND), 370, 'slider').setDepth(2).setInteractive();
		this.input.setDraggable(bgm_slider);
		this.input.setDraggable(sfx_slider);

		bgm_slider.on('drag', function() {
			let mouseX = Math.floor(scene.input.activePointer.x);
	        this.x = mouseX;
			bgm = (bgm_slider.x - LOWER_BOUND) / (UPPER_BOUND - LOWER_BOUND);
			if (this.x >= UPPER_BOUND) this.x = UPPER_BOUND
			if (this.x <= LOWER_BOUND) this.x = LOWER_BOUND
		});
		sfx_slider.on('drag', function() {
			let mouseX = Math.floor(scene.input.activePointer.x);
	        this.x = mouseX;
			if (this.x >= UPPER_BOUND) this.x = UPPER_BOUND
			if (this.x <= LOWER_BOUND) this.x = LOWER_BOUND
			sfx = (sfx_slider.x - LOWER_BOUND) / (UPPER_BOUND - LOWER_BOUND);
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
