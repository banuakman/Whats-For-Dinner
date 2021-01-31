// variables set from google maps docs
var map;
var service;
var infoWindow;
var defaultLocation = localStorage.getItem("lastLocation")
  ? JSON.parse(localStorage.getItem("lastLocation"))
  : { lat: 40.7728051, lng: -73.9796312 }; //default value: if last location saved in localStorage, then last location; otherwise set it to New York as a default (if you want test geolocation works, change the default value here to a different city)

//----initialize map build when page load (Synchronous Loading) but hidden---
//-------- sends request to get location --------------
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      //--------- receives lat and lon and puts them in pos variable --------
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      // ----------  generates new map with coordinates from pos -----------
      map = new google.maps.Map(document.getElementById("map"), {
        center: pos,
        zoom: 13,
      });
      currentLocation = pos;
      localStorage.setItem("lastLocation", JSON.stringify(pos));
    },
    (error) => {
      // ----------  generates map with default location -----------
      map = new google.maps.Map(document.getElementById("map"), {
        center: defaultLocation,
        zoom: 13,
      });
      console.log(error);
    }
  );
} else {
  // ----------  generates map with default location -----------
  map = new google.maps.Map(document.getElementById("map"), {
    center: defaultLocation,
    zoom: 13,
  });
}

// ---- select the showMap button ----
showMap = $("#showMap");

//------ click function start search ---------
showMap.click(function () {
  //------ button click removes display none from map div -------------
  document.getElementById("map").classList.remove("hide");
  document.getElementById("mapSearchForm").classList.remove("hide");

  //-------- sends request to get location --------------
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        //--------- receives lat and lon and puts them in pos variable --------
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        // ----------  gennerates new map with coordinates from pos -----------
        // infoWindow = new google.maps.InfoWindow();
        map.setCenter(pos);

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

  //   function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  //     infoWindow.setPosition(pos);
  //     infoWindow.setContent(
  //       browserHasGeolocation
  //         ? "Error: The Geolocation service failed."
  //         : "Error: Your browser doesn't support geolocation."
  //     );
  //     infoWindow.open(map);
  //   }
});

// Handle text search of click event if user enables location
function textSearchHandlerClick(results, status) {
  // --------- loop results and add marker ---------

  if (status == google.maps.places.PlacesServiceStatus.OK) {
    var lat = results[0].geometry.location.lat();
    var lng = results[0].geometry.location.lng();

    map.setCenter({ lat: lat, lng: lng });
    map.setZoom(10);

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
    map.setZoom(10);

    for (var i = 0; i < results.length; i++) {
      getPlaceID(map, results[i]);
    }
  }
}

// ---- search term is optional ----
function searchFoodInMap() {
  var searchTerm = localStorage.getItem("searchTitle"); //default is grabing from the selected dish title
  var searchLocation;
  var query;

  $("#mapSearchBtn").click(function (event) {
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
  service = new google.maps.places.PlacesService(map);
  //---------------text search --------------------
  var textSearchRequest = {
    query: input,
    type: "restaurant",
  };
  $("#dishTitle").empty();
  $("#dishTitle").text("Searching Results for:" + " " + input);

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
