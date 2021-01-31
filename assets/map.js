// variables set from google maps docs
var map;
var service;
var infoWindow;

// ---- build and place show map button ----
showMap = $("#showMap");

//------ click function initiates map build ---------
//TODO refactor the code to: after user click what's for dinner button, we init the map but hidden, after user choose eat out, display map and restaurant list
showMap.click(function () {
  //------ button click removes display none from map div -------------
  document.getElementById("map").classList.remove("hide");
  document.getElementById("mapSearchForm").classList.remove("hide");
  // Try HTML5 geolocation.
  //-------- sends request to get location --------------
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (position) {
          // document.getElementById("map").classList.remove("hide");
        }
        // document.getElementById("map").classList.remove("hide");
        //--------- receives lat and lon and puts them in pos variable --------
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        // ----------  gennerates new map with coordinates from pos -----------
        // infoWindow = new google.maps.InfoWindow();
        map = new google.maps.Map(document.getElementById("map"), {
          center: pos,
          zoom: 13,
        });

        // -------- places request -------
        var request = {
          location: pos,
          type: "restaurant",
          //TODO I tried a few search we may need to remove "with xxx(ingridient) part in the recipe title since google map does not give back results sometimes if the search term is too detailed"
          query: localStorage.getItem("searchTitle"),
        };
        console.log("request", request);

        service = new google.maps.places.PlacesService(map);
        service.textSearch(request, textSearchHandlerClick);

        searchFoodInMap();
        //----- gennerate function
      },
      () => {
        // handleLocationError(true, infoWindow, map.getCenter());
        searchFoodInMap();
      }
    );
  } else {
    // Browser doesn't support Geolocation
    // handleLocationError(false, infoWindow, map.getCenter());
    searchFoodInMap();
  }

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
  }
});

// Handle text search of click event if user enables location
function textSearchHandlerClick(results, status, pos) {
  // --------- loop results and add marker ---------
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    // map.setCenter({ lat: lat, lng: lng });

    for (var i = 0; i < results.length; i++) {
      getPlaceID(map, results[i]);
    }
  }
}

function textSearchHandler(results, status) {
  // --------- loop results and add marker ---------
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    var lat = results[0].geometry.location.lat();
    var lng = results[0].geometry.location.lng();

    map.setCenter({ lat: lat, lng: lng });

    for (var i = 0; i < results.length; i++) {
      getPlaceID(map, results[i]);
    }
  }
}

// ---- search term is optional ----
function searchFoodInMap() {
  var searchTerm = localStorage.getItem("searchTitle"); //default is grabing from the selected dish title
  console.log(searchTerm);
  var searchLocation;
  var query;

  $("#mapSearchBtn").click(function (event) {
    event.preventDefault();

    if ($("#searchTerm").val()) {
      searchTerm = $("#searchTerm").val();
    }
    if ($("#searchLoc").val()) {
      searchLocation = $("#searchLoc").val();
    }

    query = searchLocation ? `${searchTerm} in ${searchLocation}` : searchTerm;
    //perform google search
    textSearch(query);

    //clear search input
    $("#searchTerm").val("");
    $("#searchLoc").val("");
  });
}

function textSearch(input) {
  /*without geolocation center: either we create map with a default center location, e.g. New York or without center, if we want to support search to a different city or area far away, do not set center 
    Center will set once we have result from the search and set the first result location as the map center
    */
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
  });
  service = new google.maps.places.PlacesService(map);
  //---------------text search --------------------
  var textSearchRequest = {
    query: input,
    type: "restaurant",
  };

  service.textSearch(textSearchRequest, textSearchHandler);
}

// ----- Gets Place Info and Intitiates Create marker ------------
function getPlaceID(map, results) {
  //remove past list items
  $(".rest-option").remove();
  //   console.log("hello");
  const request = {
    placeId: results.place_id,
    fields: ["name", "formatted_address", "place_id", "geometry", "website"],
  };
  infoWindow = new google.maps.InfoWindow();
  service = new google.maps.places.PlacesService(map);
  service.getDetails(request, (place, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      createMarker(place);
      createList(place);
      console.log("info place", place);
    }
  });
}

// ------------- add marker ---------------
function createMarker(place) {
  const marker = new google.maps.Marker({
    map,
    position: place.geometry.location,
  });
  // ----------- displays infor in window when marker clicked --------
  google.maps.event.addListener(marker, "click", () => {
    console.log("webisite", place.website);
    infoWindow.setContent(
      "<div><strong>" +
        place.name +
        "</strong><br>" +
        "<br>" +
        place.formatted_address +
        "<br>" +
        `<a href="${place.website}">link to website </a>` +
        "</div>"
    );
    infoWindow.open(map, marker);
  });
}

// --- create list function
function createList(place) {
  $("#map-list").removeClass("hide");
  var restListEl = $("<li>")
    .attr("class", "list-group-item rest-option")
    .html(
      "<strong>" +
        place.name +
        "</strong>" +
        "<br>" +
        `<a href="${place.website}">link to website </a>`
    );
  $(".rest-list").append(restListEl);
}
