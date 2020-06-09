class Projectile extends Phaser.Physics.Arcade.Sprite {

    constructor(x, y, dart_type, range) {
        super(scene, x, y, dart_type);
        scene.add.existing(this);
        projectiles.add(this);
        this.stored_x = x;
        this.stored_y = y;
        this.range = range
        colliders.push(scene.physics.add.overlap(this, bloons, this.inflict_damage, null, this));

        this.setScale(.5);
    }

    inflict_damage(dart, bloon) {
    }

    check_range(){

        if (Phaser.Math.Distance.Between(this.x, this.y, this.stored_x, this.stored_y) >= this.range){
            return this;
        }
    }
}
