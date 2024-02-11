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
    });
});
