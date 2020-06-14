class Gatling_Dart extends Projectile {

    constructor(x, y, target_x, target_y) {
        super(x, y,"dart", 999);

        this.damage = 1;
        this.speed = 600;
        this.rotation = Phaser.Math.Angle.Between(this.x, this.y, target_x, target_y);
        scene.physics.moveTo(this, target_x, target_y, this.speed)

        this.setScale(.4);
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
