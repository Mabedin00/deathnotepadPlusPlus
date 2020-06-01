run:
	cat static/js/config.js static/js/preload.js static/js/create.js static/js/update.js > static/js/game.js
	python3 app.py
