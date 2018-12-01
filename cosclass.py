import numpy as np

import math

import re

from sklearn.feature_extraction.text import TfidfVectorizer

from flask_api import FlaskAPI
from flask.ext.cors import CORS
app = FlaskAPI(__name__)

CORS(app)



def cos_sim(a, b):
	"""Takes 2 vectors a, b and returns the cosine similarity according 
	to the definition of the dot product
	"""
	dot_product = np.dot(a, b)
	norm_a = np.linalg.norm(a)
	norm_b = np.linalg.norm(b)
	return dot_product / (norm_a * norm_b)



def sim_tn(text):
    """
    Probability of it being a request for a thumbnail
    """
    corpus = [
        "thumbnail",
        "reduce the size",
        "thumb nail",
    ]
    vectorizer = TfidfVectorizer()
    vectorizer = vectorizer.fit(corpus)
    X = vectorizer.transform(corpus).toarray()
    data = vectorizer.transform([text]).toarray()[0]
    print (max([ cos_sim(data,art) for art in X ]))
    result = 0 if math.isnan(max([ cos_sim(data,art) for art in X ])) else max([ cos_sim(data,art) for art in X ])
    return result

def sim_bw(text):
    """
    Probability of it being a request for black and white
    """
    corpus = [
        "black and white",
        "greyscale",
        "b&w"
    ]
    vectorizer = TfidfVectorizer()
    vectorizer = vectorizer.fit(corpus)
    X = vectorizer.transform(corpus).toarray()
    data = vectorizer.transform([text]).toarray()[0]
    result = 0 if math.isnan(max([ cos_sim(data,art) for art in X ])) else max([ cos_sim(data,art) for art in X ])
    return result

def sim_cvt(text):
    """
    Probability of it being a request for a convertion
    """
    corpus = [
        "convert",
        "convertion",
        "change the format to",
        "change the file to"
    ]
    vectorizer = TfidfVectorizer()
    vectorizer = vectorizer.fit(corpus)
    X = vectorizer.transform(corpus).toarray()
    data = vectorizer.transform([text]).toarray()[0]
    result = 0 if math.isnan(max([ cos_sim(data,art) for art in X ])) else max([ cos_sim(data,art) for art in X ])
    return result

def sim_tab(text):
    """
    Probability of it being a request for adding text at the bottom of the image
    """
    corpus = [
        "put text at bottom",
        "write this at",
        "bottom",
        "back of the image"
    ]
    vectorizer = TfidfVectorizer()
    vectorizer = vectorizer.fit(corpus)
    X = vectorizer.transform(corpus).toarray()
    data = vectorizer.transform([text]).toarray()[0]
    result = 0 if math.isnan(max([ cos_sim(data,art) for art in X ])) else max([ cos_sim(data,art) for art in X ])
    return result

def findFormat(text):
    matchObj = re.search( r'(?:^|\W)(pdf|png|jpg|jpeg|psd|webp|tga|tiff|tif|jxr|hdp|wdp|jpc|jp2|j2k|jpe|ico|heif|heic|gif|flif|ps|ept|eps|eps3|djvu|bmp|webp|ai)(?:$|\W)', text)
    return matchObj.group()

def classify(text):
    import operator
    di = {
        "bw": sim_bw(text),
        "cvt": sim_cvt(text),
        "tn": sim_tn(text)
    }

    print (di)
    toReturn = {
        "intent": max(di.items(), key=operator.itemgetter(1))[0],
        "data": dict()
    }

    if toReturn["intent"] == "cvt":
        print("here")
        toReturn["data"] = {
            "format": findFormat(text)
        }
    return toReturn



from flask import escape, request, jsonify

@app.route('/api', methods=['POST'])
def hello_http():
    text = ''
    if request.method == 'POST':
        print (request)
        text = request.data['text']

    print ( classify(text) )

    return jsonify( classify(text) )

if __name__ == "__main__":
    app.run(debug=True)
