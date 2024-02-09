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
        $.get('http://0.0.0.0:5001
