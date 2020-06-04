class Dart extends Phaser.Physics.Arcade.Sprite {

    constructor(x, y, range, target) {
        // TODO: add dart targeting, movement, sprite
        super(scene, x, y, "dart");
        scene.add.existing(this);
        darts.add(this);

        this.damage = 1;
        this.range = range;
        this.target = target;
        this.speed = 500;

        this.rotation = Phaser.Math.Angle.Between(this.x, this.y, target.x, target.y);
        scene.physics.moveTo(this, target.x, target.y, this.speed)

        this.setScale(.5);
    }
}
