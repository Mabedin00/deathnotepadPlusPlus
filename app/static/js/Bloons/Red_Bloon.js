class Red_Bloon extends Bloon {

    constructor(x = scene.coords.xlist[0], y = scene.coords.ylist[0]) {

        super("red_bloon",x,y);

        this.speed = .1;
        this.health = 1;
        this.value = 1;


    }


    transform(){
        this.destroy();
    }

}
