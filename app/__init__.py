from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
def hello_world():
    return render_template("game.html")

@app.route('/bagel', methods=['POST'])
def bagel():
    data = request.get_json(force = True)
    print (data['score'])
    return 'nothing to see here';

if __name__ == "__main__":
        app.debug = True
        app.run()
