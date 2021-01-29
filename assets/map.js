// variables set from google maps docs
var map;
var service;
var infowindow;
// let infoWindow;

// ---- build and place show map button ----
showMap = $("<button>")
  .attr("class", "button btn locate-btn")
  .text("Display Map");
$(".displayMap").append(showMap);
//------ click function initiates map build ---------
showMap.click(function () {
  //------ button click removes display none from map div -------------
  document.getElementById("map").classList.remove("hide");
  // Try HTML5 geolocation.
  //-------- sends request to get location --------------
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        //--------- recieves lat and lon and puts them in pos variable --------
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        // ----------  gennerates new map with coordinates from pos -----------
        infoWindow = new google.maps.InfoWindow();
        map = new google.maps.Map(document.getElementById("map"), {
          center: pos,
          zoom: 15,
        });

        // -------- places request -------
        var request = {
          location: pos,
          radius: "500",
          type: ["restaurant"],
          //-------- this querey will be equal to a variable we set from random generated dish -----------
          query: "Jerk Chicken",
        };

        service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, nearBySearchHandler);

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
    tsearchFoodInMap();
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

// ------------- handle results ----------------------
function nearBySearchHandler(results, status) {
  // --------- loop results and add marker ---------
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

function textSearchHandler(results, status) {
    // --------- loop results and add marker ---------
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      var lat = results[0].geometry.location.lat();
      var lng = results[0].geometry.location.lng();
      
      map.setCenter({lat: lat, lng: lng}); 

      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
    }
  }

// ---- search term is optional ----
function searchFoodInMap() {
    //TODO: grab title from user selected dish
    var selectedDishTitle = "macchiato";

    var searchTerm = selectedDishTitle; //default is grabing from the selected dish title
    var searchLocation;
    var query;

    $("#mapSearchBtn").click(function(event) {
        event.preventDefault();

        searchTerm = $("#searchTerm").val();
        searchLocation = $("#searchLoc").val();

        query = searchLocation? `${searchTerm} in ${searchLocation}`: searchTerm;
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
        type: 'restaurant'
    }

  service.textSearch(textSearchRequest, textSearchHandler);
}

// ------------- add marker ---------------
function createMarker(place) {
  const marker = new google.maps.Marker({
    map,
    position: place.geometry.location,
  });
  // ----------- not working/ make our own click event and dispay? -------------
  google.maps.event.addListener(marker, "click", () => {
    infoWindow.setContent(place.name);
    infoWindow.open(map);
  });
}

// need to add serrate function that calls the info and displays it when marker is clicked or displays it to a list we create
