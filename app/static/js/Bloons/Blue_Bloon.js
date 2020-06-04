class Blue_Bloon extends Bloon {

    constructor(x = scene.coords.xlist[0], y = scene.coords.ylist[0]) {

        super("blue_bloon",x,y);

        this.speed = .2;
        this.health = 1;
        this.value = 1;


    }

    transform(){
        new Red_Bloon(this.x, this.y);
        this.destroy();
    }

}
