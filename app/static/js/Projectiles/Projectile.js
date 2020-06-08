class Projectile extends Phaser.Physics.Arcade.Sprite {

    constructor(x, y, dart_type) {
        super(scene, x, y, dart_type);
        scene.add.existing(this);
        projectiles.add(this);

        colliders.push(scene.physics.add.overlap(this, bloons, this.inflict_damage, null, this));

        this.setScale(.5);
    }

    inflict_damage(dart, bloon) {
    }
}
