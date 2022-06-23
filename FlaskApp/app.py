from flask import Flask
from flask import request
from ML import MLAlgorithm

app = Flask(__name__)
response = 9


@app.route('/getFormData',  methods=['GET', 'POST'])
def getData():
    info = request.args.get('data')
    global response
    response = MLAlgorithm(info)
    return str(response)



if __name__ == '__main__':
    app.run(debug=True, port=5000)
