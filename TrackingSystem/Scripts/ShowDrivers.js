var mapOptions = {
    zoom: 5,
    center: new google.maps.LatLng(11, 81),
    mapTypeId: google.maps.MapTypeId.ROADMAP
}
var map = new google.maps.Map(document.getElementById("googleMap"), mapOptions);
var markers = [];
var myTrip = [];
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
            });
        }
    });
});
$(".drivernames").dblclick(function () {
    var username = $(this).text();
    var saveParams = { "name": username };
    var i = 0;
    $.ajax({
        type: 'POST',
        url: 'ShowHistory',
        data: saveParams,
        async: false,
        success: function (data) {

            var name, lat, lon;
            $.each(data, function () {
                $.each(this, function (k, v) {
                    if (k == "Name") { name = v }
                    if (k == "Longitude") { lon = v; }
                    if (k == "Latitude") { lat = v; }
                 });
                myTrip[i] = new google.maps.LatLng(lon, lat);
                i++;
                alert(i);
            });
            polyline();
        },
        error: function (error) {
            console.log(error.responseText);
            alert("Error has occured...");
        }
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
    // infowindow.open(map, marker);

    // Zoom to 9 when clicking on marker
   
    google.maps.event.addListener(marker, 'mouseover', function () {
        infowindow.open(map, marker);
    });

    // assuming you also want to hide the infowindow when user mouses-out
    google.maps.event.addListener(marker, 'mouseout', function () {
        infowindow.close();
    });
    //google.maps.event.addListener(marker, 'click', function () {
    //    map.setZoom(9);
    //    map.setCenter(marker.getPosition());
    //});

}

function polyline() {
    alert("hai");
    var flightPath = new google.maps.Polyline({
        path: myTrip,
        strokeColor: "#0000FF",
        strokeOpacity: 0.99,
        strokeWeight: 2
    });
    flightPath.setMap(map);

}
