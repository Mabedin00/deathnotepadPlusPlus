class Grape extends Projectile {

    constructor(x, y, target, range) {
        super(x, y,"grape", range);

        this.damage = 1;
        this.speed = 750;
        this.target = target;
        this.rotation = Phaser.Math.Angle.Between(this.x, this.y, target.x, target.y);
        scene.physics.moveTo(this, this.target.x, this.target.y, this.speed)

        this.setScale(.5);
    }

    inflict_damage(dart, bloon) {
        bloon.health -= dart.damage;
        if (bloon.health <= 0) {
            scene.money += bloon.value;
            scene.score += bloon.value;
        }
        dart.destroy();
    }
}
