function update () {
    bloons.children.iterate(function (bloon) {
      move_bloon(bloon)
    });

    tick++;
    if (tick == 60) {
      tick = 0;
      create_bloon();
    }
}

function create_bloon() {
  bloon = bloons.create(620, 0, 'red_bloon').setScale(.02);

  bloon.progress = 0;
  bloon.xlist = [620, 620, 500, 500, 80, 80, 166, 171, 249, 249, 334, 334, 414, 414, 516, 516, 620, 620, 319, 319, -30]
  bloon.ylist = [000, 148, 148, 88, 88, 248, 248, 184, 184, 254, 254, 185, 185, 335, 335, 236, 236, 400, 400, 340, 340]

  bloon.increment = 1 / (bloon.xlist.length - 1)
}

function move_bloon(bloon) {
  if (bloon.progress >= 1) return;

  bloon.current_node = Math.floor(bloon.progress / bloon.increment)

  distance = Phaser.Math.Distance.Between(bloon.xlist[bloon.current_node],
                                          bloon.ylist[bloon.current_node],
                                          bloon.xlist[bloon.current_node+1],
                                          bloon.ylist[bloon.current_node+1]);

  bloon.progress += .1/distance;

  bloon.x = Phaser.Math.Interpolation.Linear(bloon.xlist, bloon.progress);
  bloon.y = Phaser.Math.Interpolation.Linear(bloon.ylist, bloon.progress);

}

function bloon_end(goal, bloon) {
  bloon.destroy();
}
