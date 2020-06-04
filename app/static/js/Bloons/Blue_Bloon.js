class Blue_Bloon extends Bloon {

    constructor(progress) {

        super("blue_bloon", progress);

        this.speed = .2;
        this.health = 1;
        this.damage = 2;
        this.value = 1;
    }

    transform() {
        new Red_Bloon(this.progress);
        this.destroy();
    }

}
