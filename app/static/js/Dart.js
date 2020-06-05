class Dart extends Phaser.Physics.Arcade.Sprite {

    constructor(x, y, range, target, dart_type) {
        super(scene, x, y, dart_type);
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

    static inflict_damage(dart, bloon) {
        bloon.health -= dart.damage;
        if (bloon.health <= 0) {
            scene.money += bloon.value;
            bloon.transform();
        }
        dart.destroy()
    }
}
