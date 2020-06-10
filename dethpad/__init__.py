import os

from flask import Flask, render_template, request, session, flash, redirect, url_for
from flask_login import LoginManager, current_user

from dethpad.models import db, User, Map0, Map1, Map2, Map3, Map4, Map5
from dethpad.auth import auth


app = Flask(__name__)
app.register_blueprint(auth)
app.secret_key = os.urandom(32)
DIR = os.path.dirname(__file__) or "."
DIR += "/"
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///./static/data/database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = 'False'

db.init_app(app)
with app.app_context():
   db.create_all()

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'auth.login'
login_manager.login_message = 'Log in to view this page.'
login_manager.login_message_category = 'danger'


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(user_id)


@app.route('/')
def root():
    current_id = -1
    if current_user.is_authenticated:
        current_id = current_user.id
    # print(current_user)
    # print(current_user.id)

    return render_template("game.html", id = current_id)


@app.route('/test')
def test():
    return render_template('base.html')


@app.route('/score', methods=['POST'])
def score():
    data = request.get_json(force = True)
    if data['map'] == 'ocean_road':
        entry = Map0(data['score'], data['id'])
        db.session.add(entry)
        db.session.commit()
    elif data['map'] == 'cubism':
        entry = Map1(data['score'], data['id'])
        db.session.add(entry)
        db.session.commit()
    elif data['map'] == 'floating_island':
        entry = Map2(data['score'], data['id'])
        db.session.add(entry)
        db.session.commit()
    elif data['map'] == 'lightning_scar':
        entry = Map3(data['score'], data['id'])
        db.session.add(entry)
        db.session.commit()
    elif data['map'] == 'castlemania':
        entry = Map4(data['score'], data['id'])
        db.session.add(entry)
        db.session.commit()
    elif data['map'] == 'scorched_earth':
        entry = Map5(data['score'], data['id'])
        db.session.add(entry)
        db.session.commit()

    return 'hi'

@app.route('/leaderboard')
def leaderboard():

    if (not current_user.is_authenticated):
        flash('You are not logged in', 'danger')
        return redirect(url_for("root"))

    user_scores = []
    global_scores = []
    user_scores.append(get_score(current_user.map0_scores.order_by(Map0.score.desc()).first()))
    user_scores.append(get_score(current_user.map1_scores.order_by(Map1.score.desc()).first()))
    user_scores.append(get_score(current_user.map2_scores.order_by(Map2.score.desc()).first()))
    user_scores.append(get_score(current_user.map3_scores.order_by(Map3.score.desc()).first()))
    user_scores.append(get_score(current_user.map4_scores.order_by(Map4.score.desc()).first()))
    user_scores.append(get_score(current_user.map5_scores.order_by(Map5.score.desc()).first()))

    global_scores.append(get_score(Map0.query.order_by(Map0.score.desc()).first()))
    global_scores.append(get_score(Map1.query.order_by(Map1.score.desc()).first()))
    global_scores.append(get_score(Map2.query.order_by(Map2.score.desc()).first()))
    global_scores.append(get_score(Map3.query.order_by(Map3.score.desc()).first()))
    global_scores.append(get_score(Map4.query.order_by(Map4.score.desc()).first()))
    global_scores.append(get_score(Map5.query.order_by(Map5.score.desc()).first()))

    return render_template('leaderboard.html', user_scores = user_scores, global_scores = global_scores)

def get_score(score):
    if (score is None):
        return 0
    else:
        return score.score


if __name__ == "__main__":
    app.debug = True
    app.run()
