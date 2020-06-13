class Super_Dart extends Projectile {

    constructor(x, y, target, range) {
        super(x, y,"dart", range);

        this.damage = 1;
        this.speed = 2000;
        this.target = target;
        this.rotation = Phaser.Math.Angle.Between(this.x, this.y, target.x, target.y);
        scene.physics.moveTo(this, this.target.x, this.target.y, this.speed);

        this.setScale(.3);
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
