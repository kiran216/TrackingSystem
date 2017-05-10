
    var mapOptions = {
        zoom: 5,
        center: new google.maps.LatLng(11, 81),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
var map = new google.maps.Map(document.getElementById("googleMap"), mapOptions);
var markers = [];
$("#Button1").click(function () {
    $.ajax({
        url: 'getDriversJson',
        type: 'POST',
        cache: false,
        success: function (data) {

            var name, lat, lon;
            $.each(data, function () {
                $.each(this, function (k, v) {
                    if (k == "Name") { name = v; }
                    if (k == "Longitude") { lon = v; }
                    if (k == "Latitude") { lat = v; }
                });
                if ((name != undefined) && (lon != undefined) && (lat != undefined)) {
                    test(name, lon, lat);
                }
            });


        }
    });

});

$(function () {
    $(".drivernames").click(function () {
        var username = $(this).text();
        $.ajax({
            url: 'getDriversJson',
            type: 'POST',
            cache: false,
            success: function (data) {

                var name, lat, lon;
                $.each(data, function () {
                    $.each(this, function (k, v) {
                        if (k == "Name") { name = v }
                        if (k == "Longitude") { lon = v; }
                        if (k == "Latitude") { lat = v; }
                    });
                    if (name == username) {
                        test(name, lon, lat);
                    }
                    //}
                });


            }
        });

    });
});

function test(name, lon, lat) {
    var myCenter = new google.maps.LatLng(lat, lon, true);
    var marker = new google.maps.Marker({
        position: myCenter,
        title: "click to Zoom"

    });

    marker.setMap(map);
    var infowindow = new google.maps.InfoWindow({ content: "<b>" + name + "</b><br/> Latitude:" + lat + "<br /> Longitude:" + lon + "" });
    infowindow.open(map, marker);

    // Zoom to 9 when clicking on marker
    google.maps.event.addListener(marker, 'click', function () {
        map.setZoom(9);
        map.setCenter(marker.getPosition());
    });

}
function Button() {
    var eve = window.event;
    if (eve.which == 3) {
        $('#dialog').show();
        //$('#dialog').fadeOut(300);
    }
}

function Close() {

    $('#dialog').fadeOut();
}


