class HomeScene extends Phaser.Scene {
	constructor() {
		super("home");
	}

	preload () {
	}

	create () {
        this.scene.start('selection');
	}

    update() {

    }
}
