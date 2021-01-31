// Dependencies ==========================================
// - DOM Elements
// - variables

// Get the DOM elements to hide when initially loading page.
var randomRecipeContainer = document.getElementById("dish-display");
var startCallout = document.getElementById("startCallout");
var displayMap = document.getElementById("display-map");
var restaurantList = document.getElementById("restaurant-list");

// When initially loading page, hide the map, recipe list, and
// display map button.
randomRecipeContainer.classList.add("hide");
// displayMap.classList.add("hide");
// restaurantList.classList.add("hide");

// Data ==================================================

// Functions =============================================

// AJAX Call Spoonacular API
var recipesObject;
function generateRandomRecipes() {
  const spoonacularSettings = {
    async: true,
    crossDomain: true,
    url:
      "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?number=3&tags=dinner,maincourse,sidedish",
    method: "GET",
    headers: {
      "x-rapidapi-key": "aec4b3ea07msha3618e894254591p168662jsnb96bf9a67318",
      "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
    },
  };

  $.ajax(spoonacularSettings).done(function (response) {
    recipesObject = response.recipes;
    console.log(recipesObject);
    displayRandom(response.recipes);
  });
}

// Display 3 Random Dishes with Title & Picture
function displayRandom(recipes) {
  $(".randomRecipes").html("");

  for (var i = 0; i < recipes.length; i++) {
    var cellEl = $("<div>").attr("class", "columns large-4");
    var cardEl = $("<div>")
      .attr("class", "card randomRecipeCard");
    cellEl.append(cardEl)

    var title = recipes[i].title;
    var titleEl = $("<div>")
      .attr("class", "card-section randomCardTitle")
      .html("<h5>" + title + "</h5>");
    var imgEl = $("<img>")
      .attr("src", recipes[i].image)
      .attr("alt", recipes[i].title)
      .attr("class", "randomRecipePicture");
    var aEl = $("<a>")
      .attr("class", "recipe-click")
      .attr("href", "#")
      .append(imgEl); //need this to make image become clickable

    //add drop down options of eating in or eating out to each recipe card but don't display unless image is clicked
    //TODO add class and styles for drop down options
    var dropDown = $("<div>");
    var inEl = $("<a href='#' class='showRecipe'>Cook in</a>").attr(
      "data-index",
      i
    );
    var outEl = $("<a href='# class='showRestaurant'>Eat out</a>").attr(
      "data-title",
      title
    );
    dropDown.append(inEl).append($("<hr>")).append(outEl).hide();
    cardEl.append(titleEl).append(aEl).append(dropDown);
    $(".randomRecipes").append(cellEl);

    //add event listnener to user choice for eat in or eat out
    inEl.click(function () {
      var index = $(this).attr("data-index");
      displayRecipeDetail(recipes[index]);
    });

    outEl.click(function () {
      //store title in localstorage for map.js to grab
      localStorage.setItem("searchTitle", $(this).attr("data-title"));

      // Unhide the map-container div and hide the recipe-details div.
      unhideMapContainer();

      $("#showMap").trigger("click");
    });
  }

  //add event listener to images to show the drop down menu
  $(".recipe-click").on("click", function () {
    $(this).next().show(); //this is the <a> tag and dropdown is next sibling node/element
  });
}

// --------Display Recipe Details (Johanna)
// When the user clicks the recipe button from the selected image --- >
// the current displays hides (id = dish-display)
// and the new display shows (id = "recipe-details")
function unhideRecipeDetails() {
  // Hide the dish.
  var dishDisplay = document.getElementById("dish-display");
  dishDisplay.classList.add("hide");

  var recipeDetails = document.getElementById("recipe-details");
  recipeDetails.classList.remove("hide");

}


// --------Display Restaurant Details  (Johanna)
// When the user clicks the restaurant button from the selected image --- >
// the current displays hides (id = dish-display)
// and the new display shows (id = "map-container")
function unhideMapContainer() {
  // Hide the dish-display div.
  var dishDisplay = document.getElementById("dish-display");
  dishDisplay.classList.add("hide");

  // Display the map-container div.
  var mapContainer = document.getElementById("map-container");
  mapContainer.classList.remove("hide");

}

// ---- Regenerate button initial display
// --- it starts hidden
// when whats for dinner button

function displayRecipeDetail(singleRecipe) {
  //TODO: change here, recipes object contains all the information including: ingridient, instruction, etc
  //-----------------------your code should replace this part--------------------/
  
  // Unhide the recipe-details div and hide the map-container div.
  unhideRecipeDetails();

  var title = singleRecipe.title;
  var summary = singleRecipe.summary;
  var liEl = $("<li>").html("<h4>" + title + "</h4><p>" + summary + "</p>");
  var aEl = $("<a>")
    .attr("href", singleRecipe.sourceUrl)
    .text(singleRecipe.sourceUrl);
  liEl.append(aEl);
  $("#recipe-details").append(liEl);
  console.log(singleRecipe);
  //----------------------your code ends here-------------------------------
}

// User Interaction =====================================

// When the user clicks the "What's for Dinner" button (on page 1)
// call the function to generate three random dishes
// and display them.
$("#whatsfordinner").on("click", function () {
  randomRecipeContainer.classList.remove("hide");
  startCallout.classList.add("hide");
  //generate and display 3 recipes
  generateRandomRecipes();
});

// When the user clicks on the "Regenerate" button
// (on page 2) call a function to get three
// different random recipes and display them.
$("#regenerate-button").on("click", function () {
  // // --------Regenerate button display function (Johanna)
  // When the user clicks the regenerate button  --- >
  // the current display hides
  // the display display shows (id = dish-display)

  generateRandomRecipes();
});

// // When the user clicks on the Submit button
// // (on page 2) call a function to get the user's
// // choices on page 2 get data based on their choices.
// $("#submit-button").on("click", function () {});

// // When the user clicks on the Back button
// // (on page 2 - restaurants or recipes) call a
// // function to go back to the list of random
// // choices (page 2).
// $("#back-button").on("click", function () {});

// When the user clicks an image of a recipe
// on the recipe list page (page 3) call a
// function to display the recipe detail page.
