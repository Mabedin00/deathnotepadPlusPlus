class Super_Dart extends Projectile {

    constructor(x, y, target) {
        super(x, y,"dart");

        this.damage = 1;
        this.rotation = Phaser.Math.Angle.Between(this.x, this.y, target.x, target.y);
        scene.physics.moveTo(this, target.x, target.y, 2000);

        this.setScale(.35);
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
