class Dart extends Projectile {

    constructor(x, y, target, range) {
        super(x, y,"dart", range);

        this.damage = 1;
        this.rotation = Phaser.Math.Angle.Between(this.x, this.y, target.x, target.y);
        scene.physics.moveTo(this, target.x, target.y, 500)

        this.setScale(.5);
    }

    inflict_damage(dart, bloon) {
        bloon.health -= dart.damage;
        if (bloon.health <= 0) {
            scene.money += bloon.value;
            scene.score += bloon.value;
            bloon.transform();
        }
        dart.destroy()
    }
}
