// // ---------------Google Places AJAX Call ---------------

// query URL with two parameters Location and api key
var loc = "Brooklyn+NewYork";
const APIkey = "AIzaSyB4CRiYoGBXcZ0BS3z8UK1lFFILHs3VOKQ";
var queryURL =
  "https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+toronto+canada&key=" +
  APIkey;

// ---------- ajaz call ---------
$.ajax({
  url: queryURL,
  method: "GET",
}).then(function (response) {
  console.log(response);
});

/**recipes api call to spoonacular*/
const settings = {
	"async": true,
    "crossDomain": true,
    //current set to 10 randome recipes, can be changed
	"url": "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?number=10",
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "130332a6ccmshd9ecdd5f1b0a4d7p12e090jsnf616f928de59",
		"x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
	}
};

$.ajax(settings).done(function (response) {
    console.log(response.recipes);
    displayReceipe(response.recipes);
});

function displayReceipe(recipes) {
    for (var i = 0; i < recipes.length; i++) {
        var title = recipes[i].title;
        var instructions = recipes[i].instructions;
        var liEl = $("<li>").html("<h4>" +title +"</h4><p>" +instructions +"</p>");
        var aEl = $("<a>").attr("href", recipes[i].sourceUrl).text(recipes[i].sourceUrl);
        liEl.append(aEl);
        $(".recipes").append(liEl);
    }

    

}