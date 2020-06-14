class Hook extends Projectile {

    constructor(x, y, target, range) {
        super(x, y,"hook", range);

        this.speed = 750;
        this.target = target;
        this.rotation = Phaser.Math.Angle.Between(this.x, this.y, target.x, target.y);
        scene.physics.moveTo(this, this.target.x, this.target.y, this.speed)
    }

    inflict_damage(dart, bloon) {
        bloon.destroy();
        dart.destroy();
    }
}
