class Red_Bloon extends Bloon {

    constructor(progress) {

        super("red_bloon",progress);

        this.speed = .1;
        this.health = 1;
        this.damage = 1;
        this.value = 1;
    }


    transform(){
        this.destroy();
    }

}
