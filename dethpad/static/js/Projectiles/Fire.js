class Fire extends Projectile {

    constructor(x, y, angle, range) {
        super(x, y, "fire", range);
        this.damage = 1;
        this.speed = 650;
        this.pierce = 5;
        this.targets = [];
        this.setVelocity(this.speed * Math.cos(angle), this.speed *Math.sin(angle))

        this.setScale(1.5);
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
