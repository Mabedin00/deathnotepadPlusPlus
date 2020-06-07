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


	}

	create () {
		this.add.image(500, 300, 'home_screen').setDisplaySize(1000,600);
		this.place_buttons('instructions', 300, 500, .7, this.instructions_function, this);
		this.place_buttons('settings', 400, 525, .7, this.settings_function, this);
		this.place_buttons('play', 500, 540 , .9, this.play_function, this);
		this.place_buttons('log_in', 600, 525, .7, this.log_in_function, this);
		this.place_buttons('achievements', 700, 500, .7, this.achievements_function, this);


	}

	place_buttons(button_name, x, y, scale, button_function){
		let button = this.add.image(x, y, button_name).setScale(scale);
		button.setInteractive();
        button.on('pointerdown', button_function);
	}
	log_in_function(){
		console.log("log in");

	}
	settings_function(){
		console.log("settings");
	}
	play_function(){
		console.log("play");
	}
	achievements_function(){
		console.log("achievements");
	}
	instructions_function(){
		console.log("here instructions");
	}
    update() {

    }
}
