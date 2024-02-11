$(document).ready(function() {
    let selectedAmenities = {};

    $('input[type="checkbox"]').on('change', function() {
        let amenityId = $(this).data('id');
        let amenityName = $(this).data('name');

        if ($(this).is(':checked')) {
            selectedAmenities[amenityId] = amenityName;
        } else {
            delete selectedAmenities[amenityId];
        }

        let amenitiesList = Object.values(selectedAmenities).join(', ');
        $('h4').text('Amenities: ' + amenitiesList);
    });

    checkApiStatus();

    function checkApiStatus() {
        $.get('http://0.0.0.0:5001/api/places_search/', function(data){
                 $.each(data, function(index, place) {
        let article = $('<article>').addClass('place');
        let title = $('<h2>').text(place.name);
        let price = $('<div>').text('Price per night: $' + place.price_by_night);
        let information = $('<div>').addClass('information');
        let maxGuests = $('<div>').text('Max Guests: ' + place.max_guest);
        let numberRooms = $('<div>').text('Number of Rooms: ' + place.number_rooms);
        let numberBathrooms = $('<div>').text('Number of Bathrooms: ' + place.number_bathrooms);
        let description = $('<div>').text(place.description);

        information.append(maxGuests, numberRooms, numberBathrooms);
        article.append(title, price, information, description);
        $('section.places').append(article);
      });
    });
        $('button').click(function () {
    $.ajax({
      type: 'POST',
      url: 'http://localhost:5001/api/v1/places_search',
      contentType: 'application/json',
      data: JSON.stringify({ amenities: Object.keys(amenityIds) }),
      success: function (data) {
        $('.places').empty();
        data.forEach(function (place) {
          const article = [
            '<article>',
            '<div class="title_box">',
            '<h2>' + place.name + '</h2>',
            '<div class="price_by_night">' + place.price_by_night + '</div>',
            '</div>',
            '<div class="information">',
            '<div class="max_guest">' + place.max_guest + ' Guest' + (place.max_guest !== 1 ? 's' : '') + '</div>',
            '<div class="number_rooms">' + place.number_rooms + ' Bedroom' + (place.number_rooms !== 1 ? 's' : '') + '</div>',
            '<div class="number_bathrooms">' + place.number_bathrooms + ' Bathroom' + (place.number_bathrooms !== 1 ? 's' : '') + '</div>',
            '</div>',
            '<div class="user">',
            '<b>Owner:</b> ' + place.user_id.first_name + ' ' + place.user_id.last_name,
            '</div>',
            '<div class="description">',
            place.description,
            '</div>',
            '</article>'
          ];
          $('.places').append(article.join(''));
        });
      }
	    document.addEventListener('DOMContentLoaded', function () {
  const stateCityDict = {}; // Stores the checked State or City IDs

  // Listen to changes on each input checkbox tag
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener('change', function () {
      const id = this.getAttribute('data-id');
      const name = this.getAttribute('data-name');

      if (this.checked) {
        stateCityDict[id] = name;
      } else {
        delete stateCityDict[id];
      }

      updateLocations();
    });
  });

  // Function to update the h4 tag inside the div Locations
  function updateLocations() {
    const locationsDiv = document.querySelector('#locations');
    const h4Tag = locationsDiv.querySelector('h4');

    // Clear existing content
    while (h4Tag.firstChild) {
      h4Tag.removeChild(h4Tag.firstChild);
    }

    // Create new list of States checked
    const locationsList = document.createElement('ul');
    Object.values(stateCityDict).forEach(function (name) {
      // Split the name to get the type (State or City) and the actual name
      const [type, stateOrCity] = name.split(':');

      if (type === 'State') {
        const listItem = document.createElement('li');
        listItem.textContent = stateOrCity;
        locationsList.appendChild(listItem);
      }
    });

    // Append the new list to the h4 tag
    h4Tag.appendChild(locationsList);
  }

  // Listen to click event on the button tag
  const button = document.querySelector('button');
  button.addEventListener('click', function () {
    // Make a POST request to places_search with the list of Amenities, Cities, and stateCityDict
    const amenities = []; // Replace with your code to get the list of Amenities

    const cities = Object.keys(stateCityDict); // Get the list of Cities checked

    const states = Object.values(stateCityDict).reduce(function (statesList, name) {
      // Split the name to get the type (State or City) and the actual name
      const [type, stateOrCity] = name.split(':');

      if (type === 'State') {
        statesList.push(stateOrCity);
      }

      return statesList;
    }, []);

    const data = {
      amenities: amenities,
      cities: cities,
      states: states
    };

    // Make the POST request using the data variable
    // Replace the URL with the appropriate endpoint for places_search

    fetch('your-api-url/places_search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      // Handle the response data here
    })
    .catch(error => {
      console.error('Error:', error);
    });
  });
});
