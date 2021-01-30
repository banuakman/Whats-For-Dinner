// Dependencies ==========================================
// - DOM Elements
// - variables
console.log("script", "hello");

// Get the DOM elements to hide when initially loading page.
var recipeImageContainer = document.getElementById("recipe-image-container");
var startCallout = document.getElementById("startCallout");
var displayMap = document.getElementById("display-map");
var restaurantList = document.getElementById("restaurant-list");

// When initially loading page, hide the map, recipe list, and
// display map button.
recipeImageContainer.classList.add("hide");
// displayMap.classList.add("hide");
// restaurantList.classList.add("hide");

// Data ==================================================

// Functions =============================================

// AJAX Call Spoonacular API
var recipesObject;
const spoonacularSettings = {
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
  recipesObject = response.recipes;
  console.log(recipesObject);
  //displayRandom(response.recipes);
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
$("#whatsfordinner").on("click", function () {
    recipeImageContainer.classList.remove("hide");
    startCallout.classList.add("hide");
    // recipeImageContainer.textContent= "";
    displayRandom(recipesObject);
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
