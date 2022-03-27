#pip install flask --user

#import json
from flask import Flask, jsonify, request
from disease_prediction import NaiveBayes

app=Flask(__name__)

@app.route("/test")
def test():
    name="Hello There"
    print(name)
    return jsonify({'fname': name[0]})

@app.route('/')
def index():
    # input data as {s1:'xx',s2:'yy'...s5:'zz'}
    # v2 send as an array
    content_type=request.headers.get('Content-Type')
    res='None'
    if(content_type=="application/json"):
        json=request.json
        symptoms=[x for x in json.values()][0]        
        print(symptoms)
        res=NaiveBayes(symptoms)

        
        print(res)
    return res        

if __name__ == '__main__':
    print("Server has started at port=6001")
    app.run(host='0.0.0.0', port=6001)