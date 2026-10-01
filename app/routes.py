from flask import Blueprint, render_template

main = Blueprint("main", __name__)


# ================= HOME =================

@main.route("/")
def home():
    return render_template("home.html")


# ================= CHOOSE STYLE =================

@main.route("/choose-style")
def choose_style():
    return render_template("choose-style.html")


# ================= FEMALE =================

@main.route("/female")
def female():
    return render_template("female.html")


# ================= FEMALE TRY ON =================

@main.route("/female/try-on")
def female_try_on():
    return render_template("female_try_on.html")


# ================= HAIR STYLES =================

@main.route("/hair-styles")
def hair_styles():
    return render_template("Hair_Styles.html")


# ================= MALE =================

@main.route("/male")
def male():
    return render_template("male.html")

# ================= REELS =================


@main.route("/reels")
def reels():
    return render_template("reel.html")
    # ================= SAVED REELS =================

@main.route("/saved-reels")
def saved_reels():
    return render_template("saved_reel.html")