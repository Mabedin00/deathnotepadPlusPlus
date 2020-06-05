class Projectile extends Phaser.Physics.Arcade.Sprite {

    constructor(x, y, target, speed, dart_type) {
        super(scene, x, y, dart_type);
        scene.add.existing(this);
        projectiles.add(this);

        this.rotation = Phaser.Math.Angle.Between(this.x, this.y, target.x, target.y);
        scene.physics.moveTo(this, target.x, target.y, speed)

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
