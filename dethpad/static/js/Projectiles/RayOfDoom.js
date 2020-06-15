class RayOfDoom extends Projectile {

    constructor(x, y, target_x, target_y, angle) {
        super(x, y,"rod", 999);

        this.damage = 1;
        this.rotation = angle;
        this.setScale(1);
    }

    inflict_damage(dart, bloon) {
        bloon.health -= dart.damage;
        if (bloon.health <= 0) {
            scene.money += bloon.value;
            scene.score += bloon.value;
            bloon.transform();
        }
    }
}
