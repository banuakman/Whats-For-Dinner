function initMap() {
  var options = {
    zoom: 8,
    center: { lat: 42.3601, lng: -71.0589 },
  };
  var map = new google.maps.Map(document.getElementById("map"), options);

  var marker = new google.maps.Marker({
    position: { lat: 42.4668, lng: -70.9495 },
    map: map,
  });
}

var info;
