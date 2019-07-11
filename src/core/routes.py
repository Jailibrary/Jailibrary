from flask import render_template, redirect, url_for
from core import app

is_maintenance_mode = True

@app.before_request
def check_for_maintenance():
    if is_maintenance_mode and request.path != url_for('maintenance'): 
        return redirect(url_for('maintenance'))

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

@app.route("/maintenance")
def maintenance():
    return 'Jailibrary is currently undergoing maintenance at this time. Please come back later.', 503
