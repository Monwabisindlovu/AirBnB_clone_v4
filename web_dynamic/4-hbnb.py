from sqlalchemy.orm import sessionmaker
import uuid

app = Flask(__name__)

@app.route('/4-hbnb')
def hbnb():
    """
    Route to <url>/4-hbnb
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

    return render_template('4-hbnb.html',
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
