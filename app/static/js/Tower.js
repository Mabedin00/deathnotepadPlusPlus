class Tower extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y) {

        super(scene, x, y, "dart_monkey");
        scene.add.existing(this);
        scene.physics.world.enableBody(this, 0);
        towers.add(this);

    }

    
}
