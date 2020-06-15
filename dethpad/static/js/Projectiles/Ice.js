class Ice extends Projectile {

    constructor(x, y, angle, range) {
        super(x, y,"ice", range);

        this.damage = 1;
        this.speed = 750;
        this.setVelocity(this.speed * Math.cos(angle), this.speed * Math.sin(angle));
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
        dart.destroy()
    }
}
