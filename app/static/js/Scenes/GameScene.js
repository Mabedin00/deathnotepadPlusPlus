class GameScene extends Phaser.Scene {
	constructor() {
		super("game");
	}

	init(data) {
		// sets the correct map
		this.map = data.map;
		// adds path for bloons to follow based on the map
		this.coords = map_data[data.map];
		this.coords_type = map_data[data.map].type;
		this.tiles = JSON.parse(JSON.stringify(map_data[data.map].tiles));
	}

	preload () {
		this.load.image(this.map, 'static/images/maps/' + this.map + '.png');

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
		this.load.image('MOAB', 'static/images/bloons/MOAB.png');



		this.load.image('dart_monkey', 'static/images/towers/dart_monkey.png');
		this.load.image('monkey_buccaneer', 'static/images/towers/buccaneer.png');

		this.load.image('dart', 'static/images/projectiles/dart.png');
		this.load.image('bomb', 'static/images/projectiles/bomb.png');
	}

	create () {
		this.set_vars();
		this.create_key_bindings();
		this.add_map();
		this.create_buttons();
		this.add_text();
		this.create_goal();

		bloons = this.physics.add.group();
		towers = this.physics.add.group();
		projectiles = this.physics.add.group();

		this.physics.add.overlap(goal, bloons, Bloon.bloon_end, null, this);

		this.create_towers();
	}

	set_vars() {
		scene = this;
		this.grace_period = true;
		this.is_dragging = false;
		this.game_over = false;
		this.infinite_mode_enabled = false;
		this.paused = false;
		this.esc_pressed = false;
		this.counter = 0;
		this.level = 0;
		this.score = 0;
		this.lives = 15;
		this.money = 1000;
		this.bloons_deployed = [0,0,0,0,0,0,0,0]
		this.all_bloons_deployed = false;
	}

	create_key_bindings() {
		esc = this.input.keyboard.addKey('ESC');
	}

	add_map() {
		let graphics = this.add.graphics({ fillStyle: { color: 0x000000 , alpha: 1} }).setDepth(2);
		let rectangle = new Phaser.Geom.Rectangle(680, 0, 50, 500);
		graphics.fillRectShape(rectangle);
		graphics = this.add.graphics({ fillStyle: { color: 0x000000 , alpha: 1} }).setDepth(2);
		rectangle = new Phaser.Geom.Rectangle(0, 493, 695, 50);
		graphics.fillRectShape(rectangle);

		this.add.image(338, 240, this.map);

		this.add.image(492, 477, 'sidebar').setTint(0x654321).setDepth(2);
	}

	create_buttons() {
		this.popup = this.add.image(343, 253, 'popup').setScale(.3).setAlpha(.9).setDepth(1);
		this.create_border(this.popup, 'black', .9, 2);
		this.popup.graphics.setAlpha(0);
		this.popup.visible = false;

		// needs new event listener
		this.resume = this.add.image(343, 203, 'resume').setDepth(3);
		this.resume.setInteractive();
		this.resume.on('pointerdown', this.resume_game, this);
		this.resume.visible = false;

		this.infinite = this.add.image(343, 203, 'resume').setDepth(3);
		this.infinite.setInteractive();
		this.infinite.on('pointerdown', this.infinite_mode, this);
		this.infinite.visible = false;

		this.retry = this.add.image(343, 253, 'retry').setDepth(3);
		this.retry.setInteractive();
		this.retry.on('pointerdown', this.restart_game, this);
		this.retry.visible = false;

		this.main_menu = this.add.image(343, 303, 'main_menu').setDepth(3);
		this.main_menu.setInteractive();
		this.main_menu.on('pointerdown', this.return_to_menu, this);
		this.main_menu.visible = false;

		this.next_level = this.add.image(770, 479, 'next_level').setDepth(3).setScale(.6, 1);
		this.next_level.setInteractive();
		this.next_level.on('pointerdown', this.start_next_level, this);

		this.create_border(this.next_level, 'black', .9, 10);
	}

	create_border(element, color, alpha, border) {
		element.graphics = this.add.graphics({ fillStyle: { color: color , alpha: alpha} });
		let rectangle = new Phaser.Geom.Rectangle(
			element.x - element.displayWidth/2  - border/2,
			element.y - element.displayHeight/2 - border/2,
			element.displayWidth  + border,
			element.displayHeight + border);
		element.graphics.fillRectShape(rectangle);
	}

	add_text() {
		level_text = this.add.text(710, 525, 'Level: ' + this.level, { font: '24px Arial' }).setDepth(2);
		lives_icon = this.add.image(845, 540, "lives").setScale(.05).setDepth(2);
		lives_text = this.add.text(875, 525, this.lives, { font: '24px Arial' }).setDepth(2);
		money_icon = this.add.image(845, 578, "money").setScale(.05).setDepth(2);
		money_text = this.add.text(875, 565,  this.money, { font: '24px Arial' }).setDepth(2);
		score_text = this.add.text(710, 565, 'Score: ' + this.score, { font: '24px Arial' }).setDepth(2);

	}

	create_goal() {
		let goal_x = this.coords.xlist[this.coords.xlist.length - 1];
		let goal_y = this.coords.ylist[this.coords.ylist.length - 1];
		// is off-screen, so we can use any sprite we want
		goal = this.physics.add.sprite(goal_x, goal_y, this.map).setScale(.1);
		goal.visible = false;
	}

	create_towers() {
		new Dart_Monkey();
		new Monkey_Buccaneer();
	}

	update () {
		this.hotkeys();
		// if game paused or between levels
		this.update_text();
		towers.children.iterate(function (tower) {
			if (tower.being_dragged) {
				tower.drag();
			}
			// if game paused don't let towers fire
			if (scene.paused || scene.game_over) return;
			if (tower.placed) {
				tower.charge_tower();
				tower.fire();
			}
		});
		if (this.paused) return;
		if (this.grace_period) return;
		if (this.game_over) return;

		if (scene.lives <= 0) {
			this.lose_game();
			return;
		}
		// checks if all bloons have been deployed
		if (JSON.stringify(this.bloons_deployed) == JSON.stringify(level_data[this.level].bloons)) {
			this.all_bloons_deployed = true;
			if (!bloons.getLength()) {
				this.inbetween_levels();
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


		// create new bloons
		this.spawn_bloons();
	}

	start_next_level() {
		if (this.grace_period) {
			tick = 80;
			this.counter = 0
			this.level++;
			this.bloons_deployed = [0,0,0,0,0,0,0,0]
			this.all_bloons_deployed = false;
			this.grace_period = false;
			this.next_level.setTint(0xa9a9a9);
		}
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
		this.popup.graphics.setAlpha(1);
		this.resume.visible = true;
		this.retry.visible = true;
		this.main_menu.visible = true;
		this.paused = true;
	}

	resume_game() {
		this.resume.visible = false;
		this.retry.visible = false;
		this.popup.visible = false;
		this.popup.graphics.setAlpha(0);
		this.main_menu.visible = false;
		this.paused = false;
	}

	restart_game() {
		this.scene.restart();
	}

	return_to_menu() {
		this.scene.start('home');
	}

	update_text() {
		level_text.setText('Level: ' + scene.level);
		lives_text.setText(scene.lives);
		score_text.setText('Score: ' + scene.score)
		money_text.setText(scene.money);
	}

	lose_game() {
		this.game_over = true;
		this.add.text(200, 150, 'You Lose!', { font: '64px Arial' }).setDepth(2);
		this.popup.visible = true;
		this.popup.graphics.setAlpha(1);
		this.retry.visible = true;
		this.main_menu.visible = true;

		fetch('/bagel', {
			method: 'POST',
			headers: {
          'Content-Type': 'application/json'
	        },
			body: JSON.stringify({score: this.score, message: 'hi'})
		});
	}

	inbetween_levels() {
		this.money += (100 + this.level*2);
		this.score += 20 + this.level*5;
		this.next_level.clearTint();
		this.grace_period = true;
	}

	win_game() {
		this.game_over = true;
		win_text = this.add.text(220, 120, 'You Win!', { font: '64px Arial' }).setDepth(2);
		let win_msg = "\t\tThis map will be added to your list of completed maps.\n\
					   "
		win_desc = this.add.text(130, 340, win_msg, { font: '17px Arial' }).setDepth(2);
		this.popup.visible = true;
		this.popup.graphics.setAlpha(1);
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
		if 		(id == 0) new Red_Bloon (0, 0);
		else if (id == 1) new Blue_Bloon(0, 0);
		else if (id == 2) new Green_Bloon(0, 0);
		else if (id == 3) new Yellow_Bloon(0, 0);
		else if (id == 4) new Pink_Bloon(0, 0);
		else if (id == 5) new White_Bloon(0, 0);
		else if (id == 6) new Black_Bloon(0, 0);
		else if (id == 7) new Zebra_Bloon(0, 0);



	}

	prevent_tower_stacking(xcor, ycor, width, height) {
		width  = Math.floor(width);
		height = Math.floor(height);
		let y = ycor - height
		while(y < ycor + height && y < scene.tiles.length) {
		    let x = xcor - width
		    while (x < xcor + width && x < scene.tiles[y].length) {
				scene.tiles[y][x] = PATH // make unable to place towers
				x += 1
			}
		    y += 1
		}
	}
}
