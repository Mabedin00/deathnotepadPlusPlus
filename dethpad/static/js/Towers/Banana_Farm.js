class Banana_Farm extends Tower {

    constructor() {

        super('banana_farm', 750, 325);

        this.display_name = 'Banana Farm';
        this.description = 'Banana Farms grow bananas that you can collect for cash by clicking on them';
        this.cost = 800;
        this.max_charge = 300;
        this.charge = this.max_charge;
        this.range = 0;
        this.domain = LAND;
        this.setScale(.8)
    }

    fire() {
        if (this.charge >= this.max_charge) {
            this.charge = 0;
            new Banana(this.x, this.y);
        }
    }

    create_tower() {
        new Banana_Farm();
    }

    /*buy_path_1(tower) {
        super.buy_path_1(tower);
        switch (this.path1) {
            case 1:
                scene.money -= ;
                break;
            case 2:
                scene.money -= ;
                break;
            case 3:
                scene.money -= ;
                break;
            case 4:
                scene.money -= ;
        }
    }

    buy_path_2(tower) {
        super.buy_path_2(tower);
        switch (this.path2) {
            case 1
                scene.money -= ;
                break;
            case 2:
                scene.money -= ;
                break;
            case 3:
                scene.money -= ;
                break;
            case 4:
                scene.money -= ;
        }
    }*/
}
