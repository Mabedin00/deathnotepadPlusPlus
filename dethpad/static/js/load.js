let body = document.getElementById('main');
body.removeChild(body.firstElementChild);
let game_canvas = document.createElement('canvas');
game_canvas.setAttribute('id', 'game_canvas');
body.appendChild(game_canvas);