from flask import render_template, redirect, url_for
from core import app

@app.route("/")
def home():
    return render_template("home.html", title="Home")

@app.route("/about")
def about():
    return render_template("about.html", title="About")

@app.route("/library")
def library():
    return render_template("library.html", title="Library")

@app.route("/developer")
def developer():
    return render_template("developer/index.html", title="Developer")
@app.route("/developer/info")
def developer_info():
    return render_template("developer/info.html", title="Developer: Info")