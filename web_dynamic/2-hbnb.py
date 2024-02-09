#!/usr/bin/python3
"""
This is module 10-hbnb_filters
In this module we combine flask with sqlAlchemy for the first time
Run this script from AirBnB_v2 directory for imports
"""
from flask import Flask
from flask import render_template
from models import storage
from models.amenity import Amenity
from models.base_model import Base
from models.city import City
from models.place import Place
from models.review import Review
from models.state import State
from models.user import User
from os import getenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import uuid

app = Flask(__name__)

@app.route('/2-hbnb')
def hbnb():
    """
    Route to <url>/2-hbnb
    """
    states = storage.all(State).values()
    states = sorted(states, key=lambda k: k.name)
    st_ct = []

    for state in states:
        st_ct.append([state, sorted(state.cities, key=lambda k: k.name)])

    amenities = storage.all(Amenity).values()
    amenities = sorted(amenities, key=lambda k: k.name)

    places = storage.all(Place).values()
    places = sorted(places, key=lambda k: k.name)

    return render_template('2-hbnb.html',
                           states=st_ct,
                           amenities=amenities,
                           places=places,
                           cache_id=uuid.uuid4())

@app.teardown_appcontext
def close_session(exception):
    """Remove the db session or save file"""
    storage.close()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port="5000")
