class Tack extends Projectile {

    constructor(x, y, angle) {
        super(x, y, "dart");

        this.damage = 1;
        this.setVelocity(650 * Math.cos(angle), 650 *Math.sin(angle))
        this.rotation = angle;

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
