class DGLaser extends Projectile {

    constructor(x, y, target_x, target_y, pierce, speed) {
        super(x, y,"dg_laser", 999);

        this.damage = 5;
        this.speed = speed;
        this.pierce = pierce;
        this.targets = [];
        this.rotation = Math.PI/2+Phaser.Math.Angle.Between(this.x, this.y, target_x, target_y);
        scene.physics.moveTo(this, target_x, target_y, this.speed)

        this.setScale(.4);
    }

    inflict_damage(dart, bloon) {
        if (!this.targets.includes(bloon)) {
            bloon.health -= dart.damage;
            if (bloon.health <= 0) {
                scene.money += bloon.value;
                scene.score += bloon.value;
                for (let child of bloon.transform()) {
                    this.targets.push(child);
                }
            }
            dart.pierce--;
            if (!dart.pierce) {
                dart.destroy();
            }
        }
    }
}
