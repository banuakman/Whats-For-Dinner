// Dependencies ==========================================
// - DOM Elements
// - variables



// Data ==================================================



<<<<<<< HEAD
var map;
var service;
var infowindow;

function initMap() {
  // TODO: get the latitude and longitude from current location  
  var currentLoc = new google.maps.LatLng(47.6129432,-122.4821475);

  infowindow = new google.maps.InfoWindow();
  map = new google.maps.Map(document.getElementById("map"), {
    center: currentLoc,
    zoom: 15,
  });
 
 var request = {

    query: "chicken curry",
    //changefields to include other information about the place: full list can be found here: https://developers.google.com/places/web-service/search#PlaceSearchResults
    fields: ["name", "geometry", "name", "place_id"],
  };
  service = new google.maps.places.PlacesService(map);
  service.findPlaceFromQuery(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (let i = 0; i < results.length; i++) {
        createMarker(results[i]);
        console.log(results[i]);
      }
      map.setCenter(results[0].geometry.location);
    }
  });
}

function createMarker(place) {
  const marker = new google.maps.Marker({
    map,
    position: place.geometry.location,
  });
  google.maps.event.addListener(marker, "click", () => {
    infowindow.setContent(place.name);
    infowindow.open(map);
  });
}
=======
// Functions =============================================
>>>>>>> 1fa07046428b0420949ef28955c436e017ba119a

// AJAX Call Spoonacular API 
const spoonacularSettings = {
<<<<<<< HEAD
	"async": true,
    "crossDomain": true,
    //current set to 10 randome recipes, can be changed
	"url": "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?number=3",
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "130332a6ccmshd9ecdd5f1b0a4d7p12e090jsnf616f928de59",
		"x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
	}
};


// $.ajax(spoonacularSettings).done(function (response) {
//   console.log(response.recipes);
//   displayReceipe(response.recipes);
// });

// function displayReceipe(recipes) {
//   for (var i = 0; i < recipes.length; i++) {
//     var title = recipes[i].title;
//     var instructions = recipes[i].instructions;
//     var liEl = $("<li>").html(
//       "<h4>" + title + "</h4><p>" + instructions + "</p>"
//     );
//     var aEl = $("<a>")
//       .attr("href", recipes[i].sourceUrl)
//       .text(recipes[i].sourceUrl);
//     liEl.append(aEl);
//     $(".recipes").append(liEl);
//   }
// }
=======
  async: true,
  crossDomain: true,
  url:
    "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?number=3&tags=dinner,maincourse,sidedish",
  method: "GET",
  headers: {
    "x-rapidapi-key": "130332a6ccmshd9ecdd5f1b0a4d7p12e090jsnf616f928de59",
    "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
  },
};

$.ajax(spoonacularSettings).done(function (response) {
  console.log(response.recipes);
  displayRandom(response.recipes);
});

// Display 3 Dishes with Title & Picture
function displayRandom(recipes) {
   for (var i = 0; i < recipes.length; i++) {
     var title = recipes[i].title;
     var titleEl = $("<div>")
       .attr("class", "columns large-4")
       .html("<h4>" + title + "</h4>");
     var imgEl = $("<img>")
       .attr("src", recipes[i].image)
       .text("alt", recipes[i].title);
     titleEl.append(imgEl);
     $(".recipes").append(titleEl);
   }
 }

// Display Recipe Details
function displayRecipe(recipes) {
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

// User Interaction =====================================

// When the user clicks the "What's for Dinner" button (on page 1)
// call the function to generate three random dishes
// and display them.
$("#random-button").on("click", function () {
  
});

// When the user clicks on the "Regenerate" button
// (on page 2) call a function to get three
// different random recipes and display them.
$("#regenerate-button").on("click", function () {});

// When the user clicks on the Submit button
// (on page 2) call a function to get the user's
// choices on page 2 get data based on their choices.
$("#submit-button").on("click", function () {});

// When the user clicks on the Back button
// (on page 2 - restaurants or recipes) call a
// function to go back to the list of random
// choices (page 2).
$("#back-button").on("click", function () {});

// When the user clicks an image of a recipe
// on the recipe list page (page 3) call a
// function to display the recipe detail page.
$("#image-click").on("click", function () {});


>>>>>>> 1fa07046428b0420949ef28955c436e017ba119a
