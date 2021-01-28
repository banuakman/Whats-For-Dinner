//---------- What are the Dependencies -----------
// - DOM Elements
// - variables

// ----------- Data ----------------------
//--

// ----------- Functions ------------------

// ---------- User Interaction -----------------

// when the user pressed the eat out button --->
// a dish gets randomly generated

// // ---------------Google Places AJAX Call ---------------

var map;
var service;
var infowindow;

function initMap() {
  var sydney = new google.maps.LatLng(-33.867, 151.195);

  infowindow = new google.maps.InfoWindow();

  map = new google.maps.Map(document.getElementById("map"), {
    center: sydney,
    zoom: 15,
  });

  var request = {
    query: "Museum of Contemporary Art Australia",
    fields: ["name", "geometry"],
  };

  var service = new google.maps.places.PlacesService(map);

  service.findPlaceFromQuery(request, function (results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
      map.setCenter(results[0].geometry.location);
    }
  });
}

$.ajax(settings).done(function (response) {
  console.log(response.recipes);
  displayReceipe(response.recipes);
});

function displayReceipe(recipes) {
  for (var i = 0; i < recipes.length; i++) {
    var title = recipes[i].title;
    var instructions = recipes[i].instructions;
    var liEl = $("<li>").html(
      "<h4>" + title + "</h4><p>" + instructions + "</p>"
    );
    var aEl = $("<a>")
      .attr("href", recipes[i].sourceUrl)
      .text(recipes[i].sourceUrl);
    liEl.append(aEl);
    $(".recipes").append(liEl);
  }
}
