import os

from flask import Flask, render_template, request, flash, jsonify
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

    return render_template("game.html", id=current_id)


@app.route('/test')
def test():
    return render_template('base.html')

@app.route('/credits')
def credits():
    return render_template('credits.html')


@app.route('/score', methods=['POST'])
def score():
    data = request.get_json(force=True)
    if data['map'] == 'ocean_road':
        entry = Map0(data['score'], data['id'])
    elif data['map'] == 'cubism':
        entry = Map1(data['score'], data['id'])
    elif data['map'] == 'floating_island':
        entry = Map2(data['score'], data['id'])
    elif data['map'] == 'lightning_scar':
        entry = Map3(data['score'], data['id'])
    elif data['map'] == 'castlemania':
        entry = Map4(data['score'], data['id'])
    elif data['map'] == 'scorched_earth':
        entry = Map5(data['score'], data['id'])
    db.session.add(entry)
    db.session.commit()
    return ''


@app.route('/leaderboard')
def leaderboard():
    scores = {}
    if current_user.is_authenticated:
        scores['Ocean Road'] = [get_score(current_user.map0_scores.order_by(Map0.score.desc()).first())]
        scores['Cubism'] = [get_score(current_user.map1_scores.order_by(Map1.score.desc()).first())]
        scores['Floating Island'] = [get_score(current_user.map2_scores.order_by(Map2.score.desc()).first())]
        scores['Lightning Scar'] = [get_score(current_user.map3_scores.order_by(Map3.score.desc()).first())]
        scores['Castlemania'] = [get_score(current_user.map4_scores.order_by(Map4.score.desc()).first())]
        scores['Scorched Earth'] = [get_score(current_user.map5_scores.order_by(Map5.score.desc()).first())]
    else:
        flash('You are not logged in!', 'warning')
        scores['Ocean Road'] = [0]
        scores['Cubism'] = [0]
        scores['Floating Island'] = [0]
        scores['Lightning Scar'] = [0]
        scores['Castlemania'] = [0]
        scores['Scorched Earth'] = [0]

    scores['Ocean Road'].append(get_score(Map0.query.order_by(Map0.score.desc()).first()))
    scores['Cubism'].append(get_score(Map1.query.order_by(Map1.score.desc()).first()))
    scores['Floating Island'].append(get_score(Map2.query.order_by(Map2.score.desc()).first()))
    scores['Lightning Scar'].append(get_score(Map3.query.order_by(Map3.score.desc()).first()))
    scores['Castlemania'].append(get_score(Map4.query.order_by(Map4.score.desc()).first()))
    scores['Scorched Earth'].append(get_score(Map5.query.order_by(Map5.score.desc()).first()))

    return render_template('leaderboard.html', scores=scores, format=format)


@app.route('/map-stats/<map>')
def map_stats(map):
    stats = {}
    if map == 'Ocean Road':
        table = Map0
    elif map == 'Cubism':
        table = Map1
    elif map == 'Floating Island':
        table = Map2
    elif map == 'Lightning Scar':
        table = Map3
    elif map == 'Castlemania':
        table = Map4
    elif map == 'Scorched Earth':
        table = Map5

    stats['gp'] = table.query.count()
    if stats['gp'] == 0:
        stats['ghs'] = 0
    else:
        stats['ghs'] = table.query.order_by(table.score.desc()).first().score
    if current_user.is_authenticated:
        user_scores = table.query.filter_by(user_id=current_user.id)
        stats['up'] = user_scores.count()
        if stats['up'] == 0:
            stats['uhs'] = 0
        else:
            stats['uhs'] = user_scores.order_by(table.score.desc()).first().score
    else:
        stats['uhs'] = 0
        stats['up'] = 0

    return jsonify(stats)


def get_score(score):
    if score is None:
        return 0
    else:
        return score.score


if __name__ == "__main__":
    app.debug = True
    app.run()
