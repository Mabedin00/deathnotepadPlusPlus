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
		this.load.audio(this.map + '_audio', 'static/audio/' + this.map + '.mp3');
	}

	create () {
		bloons = this.physics.add.group();
		towers = this.physics.add.group();
		projectiles = this.physics.add.group();

		this.set_vars();
		this.create_key_bindings();
		this.add_map();
		this.create_buttons();
		this.add_text();
		this.create_goal();
		this.create_towers();
	}

	set_vars() {
		scene = this;
		this.soundtrack = this.sound.add(this.map + '_audio');
		this.soundtrack.volume = bgm
		this.bloon_pop = this.sound.add('bloon_pop');
		this.explosion = this.sound.add('explosion');
		this.soundtrack.loop = true;
		this.soundtrack.play()
		this.grace_period = true;
		this.is_dragging = false;
		this.game_over = false;
		this.infinite_mode_enabled = false;
		this.paused = false;
		this.esc_key_pressed = false;
		this.counter = 0;
		this.level = 0;
		this.score = 0;
		this.lives = 1;
		this.money = 500;
		this.fast_forward = 1;
		this.bloons_deployed = [0,0,0,0,0,0,0,0,0,0,0]
		this.all_bloons_deployed = false;
		this.tower_selected = false;
		this.selected_tower;
	}

	create_key_bindings() {
		esc_key = this.input.keyboard.addKey('ESC');
		x_key = this.input.keyboard.addKey('X');
		s_key = this.input.keyboard.addKey('S');

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
		this.popup = this.add.image(343, 253, 'popup').setScale(.3).setAlpha(.9).setDepth(4);
		this.create_border(this.popup, 'black', .9, 2, 3);
		this.popup.graphics.setAlpha(0);
		this.popup.visible = false;

		this.pause_text = this.add.text(286, 127, 'Paused', {font: '36px Arial'})
		this.pause_text.visible = false;
		this.pause_text.setDepth(5);

		// needs new event listener
		this.resume = this.add.image(343, 203, 'resume').setDepth(4);
		this.resume.setInteractive();
		this.resume.on('pointerdown', this.resume_game, this);
		this.resume.on('pointerover', function() {this.setTint(0xbecafe)})
		this.resume.on('pointerout', function() {this.clearTint()})
		this.resume.visible = false;

		this.infinite = this.add.image(343, 203, 'resume').setDepth(4);
		this.infinite.setInteractive();
		this.infinite.on('pointerdown', this.infinite_mode, this);
		this.infinite.on('pointerover', function() {this.setTint(0xbecafe)})
		this.infinite.on('pointerout', function() {this.clearTint()})
		this.infinite.visible = false;

		this.retry = this.add.image(343, 253, 'retry').setDepth(4);
		this.retry.setInteractive();
		this.retry.on('pointerdown', this.restart_game, this);
		this.retry.on('pointerover', function() {this.setTint(0xbecafe)})
		this.retry.on('pointerout', function() {this.clearTint()})
		this.retry.visible = false;

		this.main_menu = this.add.image(343, 303, 'main_menu').setDepth(4);
		this.main_menu.setInteractive();
		this.main_menu.on('pointerdown', this.return_to_menu, this);
		this.main_menu.on('pointerover', function() {this.setTint(0xbecafe)})
		this.main_menu.on('pointerout', function() {this.clearTint()})
		this.main_menu.visible = false;

		this.next_level = this.add.image(770, 479, 'next_level').setDepth(4).setScale(.6, 1);
		this.next_level.setInteractive();
		this.next_level.on('pointerdown', this.start_next_level, this);
		this.create_border(this.next_level, 'black', .9, 4, 3);

		this.fast_forward_button = this.add.image(900, 479, 'fast_forward').setDepth(4).setScale(.6, 1);
		this.fast_forward_button.setInteractive();
		this.fast_forward_button.on('pointerdown', this.toggle_fast_forward, this);
		this.create_border(this.fast_forward_button, 'black', .9, 4, 3);

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

	add_text() {
		level_text = this.add.text(710, 525, 'Level: ' + this.level, { font: '24px Arial' }).setDepth(2);
		lives_icon = this.add.image(875, 540, "lives").setScale(.05).setDepth(2);
		lives_text = this.add.text(905, 525, this.lives, { font: '24px Arial' }).setDepth(2);
		money_icon = this.add.image(875, 578, "money").setScale(.05).setDepth(2);
		money_text = this.add.text(905, 565,  this.money, { font: '24px Arial' }).setDepth(2);
		score_text = this.add.text(710, 565, 'Score: ' + this.score, { font: '24px Arial' }).setDepth(2);

	}

	create_goal() {
		let goal_x = this.coords.xlist[this.coords.xlist.length - 1];
		let goal_y = this.coords.ylist[this.coords.ylist.length - 1];
		// is off-screen, so we can use any sprite we want
		goal = this.physics.add.sprite(goal_x, goal_y, this.map).setScale(.01);
		goal.visible = false;
		this.physics.add.overlap(goal, bloons, Bloon.bloon_end, null, this);
		if (this.coords.num_paths >= 2) {
			goal_x = this.coords.xlist1[this.coords.xlist1.length - 1];
			goal_y = this.coords.ylist1[this.coords.ylist1.length - 1];
			goal1 = this.physics.add.sprite(goal_x, goal_y, this.map).setScale(.01);
			goal1.visible = false;
			this.physics.add.overlap(goal1, bloons, Bloon.bloon_end, null, this);
		}
		if (this.coords.num_paths == 3) {
			goal_x = this.coords.xlist2[this.coords.xlist2.length - 1];
			goal_y = this.coords.ylist2[this.coords.ylist2.length - 1];
			goal2 = this.physics.add.sprite(goal_x, goal_y, this.map).setScale(.01);
			goal2.visible = false;
			this.physics.add.overlap(goal2, bloons, Bloon.bloon_end, null, this);
		}
	}

	create_towers() {
		new Dart_Monkey();
		new Monkey_Buccaneer();
		new Tack_Shooter();
		new Ice_Monkey();
		new Banana_Farm();
		new Super_Monkey();
	}

	update () {
		// console.log(colliders)
		this.hotkeys();
		// if game paused or between levels
		this.update_text();
		let destroyed_projs = [];
		projectiles.children.iterate(function (projectile){
			destroyed_projs.push(projectile.check_range());

		});
		for (let destroyed_proj of destroyed_projs) {
			if (destroyed_proj != undefined) destroyed_proj.destroy();
        }
		let sold_towers = [];
		towers.children.iterate(function (tower) {
			if (tower.being_dragged) {
				tower.drag();
			}
			if (tower.placed && tower.graphics.visible) {
				if(x_key.isDown) tower.unshow_details();
				sold_towers.push(tower.sell());

			}
			// if game paused don't let towers fire
			if (scene.paused || scene.game_over ||scene.grace_period) return;
			if (tower.placed) {
				tower.charge_tower();
				tower.fire();
			}
		});
		for (let sold_tower of sold_towers) {

			if (sold_tower != undefined) {
				sold_tower.graphics.destroy();
 				sold_tower.destroy();
		 	}
		}
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
				if (level_data[this.level+1].tick == 'algorithm' && !this.infinite_mode_enabled) {
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
			this.bloons_deployed = [0,0,0,0,0,0,0,0,0,0,0]
			this.all_bloons_deployed = false;
			this.grace_period = false;
			this.next_level.setTint(0xa9a9a9);
		}
	}

	hotkeys() {


		if (esc_key.isDown) {
			this.esc_key_pressed = true;
		}
		if (this.esc_key_pressed && esc_key.isUp){
   			this.paused = !this.paused;
			if(this.paused){
				this.pause_game();
			}
			else if (!this.paused){
				this.resume_game();
			}
			this.esc_key_pressed = false;
		}
	}

	pause_game() {
		this.popup.visible = true;
		this.pause_text.visible = true;
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
		this.pause_text.visible = false;
		this.popup.graphics.setAlpha(0);
		this.main_menu.visible = false;
		this.paused = false;
	}

	restart_game() {
		this.soundtrack.stop();
		this.scene.restart();
	}

	return_to_menu() {
		this.soundtrack.stop();
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
		this.add.text(200, 150, 'You Lose!', { font: '64px Arial' }).setDepth(5);
		this.popup.visible = true;
		this.popup.graphics.setAlpha(1);
		this.retry.visible = true;
		this.main_menu.visible = true;

		fetch('/score', {
			method: 'POST',
			headers: {
		  'Content-Type': 'application/json'
			},
			body: JSON.stringify({score: this.score, map: this.map, id: id})
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
		win_text = this.add.text(220, 120, 'You Win!', { font: '64px Arial' }).setDepth(4);
		let win_msg = "\t\tThis map will be added to your list of completed maps.\n\
					   "
		win_desc = this.add.text(130, 340, win_msg, { font: '17px Arial' }).setDepth(4);

		fetch('/score', {
			method: 'POST',
			headers: {
		  'Content-Type': 'application/json'
			},
			body: JSON.stringify({score: this.score, map: this.map, id: id})
		});

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

	toggle_fast_forward() {
		if (this.fast_forward == 1) {
			this.fast_forward_button.setTint(0xffa500);
			this.fast_forward = 3;
		}
		else if (this.fast_forward == 3) {
			this.fast_forward_button.clearTint();
			this.fast_forward = 1;
		}
	}

	spawn_bloons() {
		tick += (level_data[this.level].tick * scene.fast_forward);
		if (tick >= 40 && !this.all_bloons_deployed) {
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
		if 		(id == 0) new Red_Bloon (0, 0, -1);
		else if (id == 1) new Blue_Bloon(0, 0, -1);
		else if (id == 2) new Green_Bloon(0, 0, -1);
		else if (id == 3) new Yellow_Bloon(0, 0, -1);
		else if (id == 4) new Pink_Bloon(0, 0, -1);
		else if (id == 5) new White_Bloon(0, 0, -1);
		else if (id == 6) new Black_Bloon(0, 0, -1);
		else if (id == 7) new Zebra_Bloon(0, 0, -1);
		else if (id == 8) new Rainbow_Bloon(0, 0, -1);
		else if (id == 9) new Ceramic_Bloon(0, 0, -1);
		else if (id == 10) new MOAB(0, 0, -1);
	}

	prevent_tower_stacking(xcor, ycor, width, height) {
		width  = Math.floor(width);
		height = Math.floor(height);

		for (let y = ycor - height; y < ycor + height && y < scene.tiles.length; y++) {
			if (y <= 0) y = 0;
			for (let x = xcor - width; x < xcor + width && x < scene.tiles[y].length; x++) {
				if (x <= 0) x = 0;
				scene.tiles[y][x] = PATH;
			}
		}
	}
}
