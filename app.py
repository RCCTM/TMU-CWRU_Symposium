from flask import Flask, jsonify, render_template

app = Flask(__name__)

@app.route('/templates/symposium')
def get_symposium_info():
    return render_template('symposium.html')

@app.route('/api/news')
def get_news():
    return jsonify([])

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

if __name__ == '__main__':
    app.run(debug=True)
