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
  }
});
