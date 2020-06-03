class Tower extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y) {

        super(scene, x, y, "dart_monkey");
        scene.add.existing(this);
        scene.physics.world.enableBody(this, 0);
        towers.add(this);
        this.being_dragged = false;

        this.setInteractive();

        this.on('pointerdown', this.toggle_drag, this);

    }

    toggle_drag() {
        // ocean_road contains 2d array of valid tiles for placement
        // 0: not valid, 1: valid for ocean, 2: valid for land
        let invalid_location = 2;
        let tile = ocean_road[scene.input.activePointer.y][scene.input.activePointer.x];

        if (this.being_dragged && tile != invalid_location) return;
        if (this.being_dragged) {
            scene.create_tower();
            this.removeInteractive();
        }
        this.being_dragged = !this.being_dragged
    }

    drag(mouse) {
        this.x = scene.input.activePointer.x;
        this.y = scene.input.activePointer.y;
    }
}
