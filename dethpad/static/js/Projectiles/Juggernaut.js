class Juggernaut extends Projectile {

    constructor(x, y, target, range) {
        super(x, y,"juggernaut", range);

        this.damage = 100;
        this.speed = 750;
        this.pierce = 100;
        this.target = target;
        this.targets = [];
        this.rotation = Phaser.Math.Angle.Between(this.x, this.y, target.x, target.y);
        scene.physics.moveTo(this, this.target.x, this.target.y, this.speed)
        this.setScale(0.7);
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
