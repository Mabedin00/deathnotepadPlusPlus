class GameScene extends Phaser.Scene {
	constructor() {
		super("game");
	}

	init(data) {
		// sets the correct map
		this.map = data.map;
		// adds path for bloons to follow based on the map
		this.coords = map_data[data.map];
		console.log(this.coords)
		this.coords_type = map_data[data.map].type;
	}

	preload () {
		this.load.image('map', 'static/images/maps/' + this.map + '.png');

		this.load.image('popup', 'static/images/maps/popup.jpg')
		this.load.image('resume', 'static/images/maps/resume_button.jpg')
		this.load.image('retry', 'static/images/maps/retry_button.jpg')
		this.load.image('main_menu', 'static/images/maps/main_menu_button.jpg')

		this.load.image('red_bloon', 'static/images/bloons/red_bloon.png');
		this.load.image('blue_bloon', 'static/images/bloons/blue_bloon.png');

		this.load.image('dart_monkey', 'static/images/towers/dart_monkey.png');
		this.load.image('monkey_buccaneer', 'static/images/towers/buccaneer.png');

		this.load.image('dart', 'static/images/projectiles/dart.png');
		this.load.image('bomb', 'static/images/projectiles/bomb.png');
	}


	create () {
		this.set_vars();
		this.create_key_bindings();
		this.add.image(343, 253, 'map');

		this.popup = this.add.image(343, 253, 'popup').setScale(.3).setAlpha(.9).setDepth(1);
		this.popup.visible = false;
		// in future change to work with infinite mode
		// needs new event listener
		this.resume = this.add.image(343, 203, 'resume').setDepth(1);
		this.resume.setInteractive();
		this.resume.on('pointerdown', this.resume_game, this);
		this.resume.visible = false;

		this.infinite = this.add.image(343, 203, 'resume').setDepth(1);
		this.infinite.setInteractive();
		this.infinite.on('pointerdown', this.infinite_mode, this);
		this.infinite.visible = false;

		this.retry = this.add.image(343, 253, 'retry').setDepth(1);
		this.retry.setInteractive();
		this.retry.on('pointerdown', this.restart_game, this);
		this.retry.visible = false;

		this.main_menu = this.add.image(343, 303, 'main_menu').setDepth(1);
		this.main_menu.setInteractive();
		this.main_menu.on('pointerdown', this.return_to_menu, this);
		this.main_menu.visible = false;

		this.add_text();
		this.create_goal();

		bloons = this.physics.add.group();
		towers = this.physics.add.group();
		projectiles = this.physics.add.group();

		this.physics.add.overlap(projectiles, bloons, Projectile.inflict_damage, null, this);
		this.physics.add.overlap(goal, bloons, Bloon.bloon_end, null, this);

		scene.create_towers();
	}

	create_key_bindings() {
		esc = this.input.keyboard.addKey('ESC');
	}

	set_vars() {
		scene = this;
		this.game_over = false;
		this.infinite_mode_enabled = false;
		this.paused = false;
		this.esc_pressed = false;
		this.counter = 0;
		this.level = 1;
		this.lives = 1;
		this.money = 500;
		this.bloons_deployed = [0,0]
		this.all_bloons_deployed = false;
	}

	add_text() {
		level_text = this.add.text(700, 350, 'Level: ' + this.level, { font: '24px Arial' });
		lives_text = this.add.text(700, 400, 'Lives: ' + this.lives, { font: '24px Arial' });
		money_text = this.add.text(700, 450, 'Money: ' + this.money, { font: '24px Arial' });
	}

	create_goal() {
		let goal_x = this.coords.xlist[this.coords.xlist.length - 1];
		let goal_y = this.coords.ylist[this.coords.ylist.length - 1];
		// is off-screen, so we can use any sprite we want
		goal = this.physics.add.sprite(goal_x, goal_y, 'map').setScale(.1);
	}

	create_towers() {
		new Dart_Monkey();
		new Monkey_Buccaneer();
	}


	update () {
		this.hotkeys();
		if (this.paused) return;
		this.update_text();
		if (this.game_over) return;

		if (scene.lives <= 0) {
			this.lose_game();
			return;
		}
		// checks if all bloons have been deployed
		if (JSON.stringify(this.bloons_deployed) == JSON.stringify(level_data[this.level].bloons)) {
			this.all_bloons_deployed = true;
			if (!bloons.getLength()) {
				this.next_level();
				// if user has reached last level
				if (level_data[this.level].tick == 'algorithm' && !this.infinite_mode_enabled) {
					this.win_game();
					return;
				}
			}
		}

		bloons.children.iterate(function (bloon) {
			bloon.move();
		});
		towers.children.iterate(function (tower) {
			if (tower.being_dragged) {
				tower.drag();
			}
			if (tower.placed) {
				tower.charge_tower();
				tower.fire();
			}
		});

		// create new bloons
		this.spawn_bloons();
	}

	hotkeys() {
		if (esc.isDown) {
			this.esc_pressed = true;
		}
		if (this.esc_pressed && esc.isUp){
   			this.paused = !this.paused;
			if(this.paused){
				this.pause_game();
			}
			else if (!this.paused){
				this.resume_game();
			}
			this.esc_pressed = false;
		}
	}

	pause_game() {
		this.popup.visible = true;
		this.resume.visible = true;
		this.retry.visible = true;
		this.main_menu.visible = true;
		this.paused = true;
	}
	resume_game() {
		this.resume.visible = false;
		this.retry.visible = false;
		this.popup.visible = false;
		this.main_menu.visible = false;
		this.paused = false;
	}

	restart_game() {
		this.scene.restart();
	}
	return_to_menu() {
		this.scene.start('selection');
	}

	update_text() {
		level_text.setText('Level: ' + scene.level);
		lives_text.setText('Lives: ' + scene.lives);
		money_text.setText('Money: ' + scene.money);
	}

	lose_game() {
		this.game_over = true;
		this.add.text(200, 150, 'You Lose!', { font: '64px Arial' }).setDepth(2);
		this.popup.visible = true;
		this.retry.visible = true;
		this.main_menu.visible = true;
	}

	next_level() {
		this.counter = 0
		this.money += (100 + this.level*2);
		this.level++;
		this.bloons_deployed = [0, 0]
		this.all_bloons_deployed = false;
	}

	win_game() {
		this.game_over = true;
		win_text = this.add.text(220, 120, 'You Win!', { font: '64px Arial' }).setDepth(2);
		let win_msg = "\t\tThis map will be added to your list of completed maps.\n\
					   "
		win_desc = this.add.text(130, 340, win_msg, { font: '17px Arial' }).setDepth(2);
		this.popup.visible = true;
		this.infinite.visible = true;
		this.retry.visible = true;
		this.main_menu.visible = true;
	}

	infinite_mode() {
		this.resume_game();
		this.infinite.visible = false;
		win_text.destroy();
		win_desc.destroy();
		this.game_over = false;
	}

	spawn_bloons() {
		tick += level_data[this.level].tick;

		if (tick >= 100 && !this.all_bloons_deployed) {
			tick = 0;

			var idx = this.counter % this.bloons_deployed.length;
			idx = this.return_valid_idx(idx);
			this.create_bloon(idx);
			this.bloons_deployed[idx] += 1
			this.counter++;
		}
	}

	return_valid_idx(idx) {
		if (level_data[this.level].bloons[idx] == this.bloons_deployed[idx]) {
		  if (idx == this.bloons_deployed.length - 1) return this.return_valid_idx(0);
		  return this.return_valid_idx(idx + 1);
	  }
		return idx;
	}

	create_bloon(id) {
		if (id == 0)      new Red_Bloon (0);
		else if (id == 1) new Blue_Bloon(0);
	}
}
