class Dart_Monkey extends Tower {

    constructor() {

        super('dart_monkey', 750, 50);

        this.display_name = 'Dart Monkey';
        this.description = 'Shoot a single dart that pops a single bloon. A good, cheap tower suitable for the early rounds.';
        this.cost = 200;
        this.max_charge = 80;
        this.charge = this.max_charge;
        this.range = 150;
        this.pierce = 1;
        this.next_path1_price = 90;
        this.next_path2_price = 140;
        this.domain = LAND;
        this.dart_type = 'dart'
    }

    fire() {
        this.targets = this.return_valid_targets();
        // if there are no valid targets, stop fire function
        if (!this.targets.length) return;
        this.target = this.return_best_target();

        if (this.charge >= this.max_charge) {
            this.charge = 0;
            this.rotation = Phaser.Math.Angle.Between(this.x, this.y, this.target.x, this.target.y) + Math.PI / 2;
            new Dart(this.x, this.y, this.target, this.range, this.pierce);
            if (this.path2 >= 3) {
                let x = this.target.x - this.x;
                let y = this.target.y - this.y;
                let rotate = (theta) => {
                    return [x*Math.cos(theta)-y*Math.sin(theta)+this.x, x*Math.sin(theta)+y*Math.cos(theta)+this.y]
                }
                let split1 = rotate(Math.PI/12);
                let split2 = rotate(-Math.PI/12);
                new Dart(this.x, this.y, {x:split1[0], y:split1[1]}, this.range, this.pierce);
                new Dart(this.x, this.y, {x:split2[0], y:split2[1]}, this.range, this.pierce);
            }
        }
    }

    create_tower() {
        new Dart_Monkey();
    }

    buy_path_1(tower) {
        if (scene.money >= tower.next_path1_price) {
            super.buy_path_1(tower);
            switch (this.path1) {
                case 1:
                    this.range += 38;
                    this.updateGraphics();
                    scene.money -= 90;
                    this.next_path1_price = 120;
                    break;
                case 2:
                    this.range += 37;
                    this.updateGraphics();
                    scene.money -= 120;
                    this.next_path1_price = 500;
                    break;
                case 3:
                    //become spike-o-pult
                    scene.money -= 500;
                    this.next_path1_price = 1500;
                    break;
                case 4:
                    //become juggernaut
                    scene.money -= 1500;
            }
        }
    }

    buy_path_2(tower) {
        if (scene.money >= tower.next_path2_price) {
            super.buy_path_2(tower);
            switch (this.path2) {
                case 1:
                    this.pierce++;
                    scene.money -= 140;
                    this.next_path2_price = 170;
                    break;
                case 2:
                    this.pierce += 2;
                    //camo detection
                    scene.money -= 170;
                    this.next_path2_price = 330;
                    break;
                case 3:
                    scene.money -= 330;
                    this.next_path2_price = 8000;
                    break;
                case 4:
                    //super monkey fan club: turns into super monkey for 15 seconds
                    scene.money -= 8000;
            }
        }
    }
}