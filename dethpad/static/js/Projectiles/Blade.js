class Blade extends Projectile {

    constructor(x, y, angle, range, pierce) {
        super(x, y, "blade", range);
        this.damage = 5;
        this.speed = 650;
        this.pierce = pierce;
        this.targets = [];
        this.setVelocity(this.speed * Math.cos(angle), this.speed *Math.sin(angle))
        this.rotation = angle;

        this.setScale(0.75);
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
