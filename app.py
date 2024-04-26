import flask
from flask import Flask, request, render_template, redirect, url_for, session, send_file
from PIL import Image
import cv2
import pytesseract
import datetime
import numpy as np
import io
import os
import base64
from fpdf import FPDF

app = Flask(__name__)
app.secret_key = '\xaai\xe42\xf7\xdfEN\x02\x17\x9e\x9b\xcd-\xcf\x0cL\xc4\xbb\xeb\xa4\x10\x06'
app_dir = os.path.dirname(os.path.abspath(__file__))

"""Change to your own path"""
tesseract_dir = 'C:\\Program Files\\Tesseract-OCR\\tesseract.exe'


@app.route('/')
def login():
    return render_template("login.html", title="Login")

@app.route('/home', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        # Handle form submission
        # Example: authenticate user
        return redirect(url_for('scan'))  # Redirect to the scan route
    else:
        return render_template("index.html", title="Image Converter")



@app.route('/scan', methods=['GET', 'POST'])
def scan():
    if request.method == 'POST':
        image = request.form['imageInput']
        img = Image.open(io.BytesIO(base64.b64decode(image.split(',')[1])))
        text = pytesseract.image_to_string(img)
        print(text) 

        session['data'] = {
            'text': text,
        }
        return redirect(url_for('result'))

@app.route('/result')
def result():
    if "data" in session:
        data = session['data']
        print(data)
        return render_template(
            'text.html',
            title= "Text scanned",
            text = data['text'],
        )
    else:
        return "Error"
    
@app.route('/make_pdf', methods=['POST'])
def make_txt():
    if "data" in session:
        text = session['data']['text']
        txt_path = save_txt(text)
        return send_file(txt_path, as_attachment=True, mimetype='text/plain')

def save_txt(text):
    txt_path = os.path.join(app_dir, "output.txt")
    with open(txt_path, "w") as f:
        f.write(text)
    return txt_path

if __name__ == '__main__':
    pytesseract.pytesseract.tesseract_cmd = tesseract_dir
    app.run(debug=True) 