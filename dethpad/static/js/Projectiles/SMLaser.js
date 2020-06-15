class SMLaser extends Projectile {

    constructor(x, y, target, range) {
        super(x, y,"sm_laser", range);

        this.damage = 5;
        this.speed = 2000;
        this.pierce = 2;
        this.target = target;
        this.targets = [];
        this.rotation = Math.PI/2+Phaser.Math.Angle.Between(this.x, this.y, target.x, target.y);
        scene.physics.moveTo(this, this.target.x, this.target.y, this.speed)

        this.setScale(0.5);
    }

    inflict_damage(dart, bloon) {
        if (!this.targets.includes(bloon)) {
            if (bloon.isMOAB) {
                bloon.health -= 2*dart.damage;
            } else {
                bloon.health -= dart.damage;
            }
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
