from flask import Flask, render_template, request
from models import Amenity

app = Flask(__name__)

@app.route('/1-hbnb')
def hbnb():
    amenities = Amenity.all()
    cache_id = request.args.get('cache_id', '')
    return render_template('1-hbnb.html', amenities=amenities, cache_id=cache_id)
