//---------- What are the Dependencies -----------
// - DOM Elements
// - variables

// ----------- Data ----------------------
//--

// ----------- Functions ------------------

// ---------- User Interaction -----------------

// when the user pressed the eat out button --->
// a dish gets randomly generated

// When the user clicks the "Random" button (on page 1)
// call the function to generate three random dishes
// and display them.
$("#random-button").on("click", function () {});

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

// // ---------------Google Places AJAX Call ---------------

const spoonacularSettings = {
  async: true,
  crossDomain: true,
  //current set to 10 randome recipes, can be changed
  url:
    "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?number=10",
  method: "GET",
  headers: {
    "x-rapidapi-key": "130332a6ccmshd9ecdd5f1b0a4d7p12e090jsnf616f928de59",
    "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
  },
};

$.ajax(spoonacularSettings).done(function (response) {
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
