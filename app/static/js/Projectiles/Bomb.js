class Bomb extends Projectile {

    constructor(x, y, target) {
        super(x, y, target, 200,"bomb");

        this.damage = 1;

        this.setScale(.5);
    }

    static inflict_damage(dart, bloon) {
        bloon.health -= dart.damage;
        if (bloon.health <= 0) {
            scene.money += bloon.value;
            bloon.transform();
        }
        dart.destroy()
    }
}
