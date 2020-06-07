import os
from flask import Flask, render_template
from models import db

app = Flask(__name__)
app.secret_key = os.urandom(32)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///./static/data/database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = 'False'

db.init_app(app)
with app.app_context():
    db.create_all()

@app.route('/')
def hello_world():
    return render_template("game.html")


if __name__ == "__main__":
    app.debug = True
    app.run()
