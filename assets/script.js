// Dependencies ==========================================
// - DOM Elements - Get the DOM elements we need
var randomRecipeContainer = document.getElementById("dish-display");
var startCallout = document.getElementById("startCallout");
var displayMap = document.getElementById("map-container");
var restaurantList = document.getElementById("restaurant-list");

// When initially loading page, hide the map, recipe list, and
// display map button.
randomRecipeContainer.classList.add("hide");
displayMap.classList.add("hide");
// restaurantList.classList.add("hide");

// AJAX Call Spoonacular API
var recipesObject;
function generateRandomRecipes() {
  // Get three random recipes by calling the Spoonacular API
  const spoonacularSettings = {
    async: true,
    crossDomain: true,
    url:
      "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?number=3&tags=dinner,maincourse,sidedish",
    method: "GET",
    headers: {
      //  "x-rapidapi-key": "130332a6ccmshd9ecdd5f1b0a4d7p12e090jsnf616f928de59",
      //  "x-rapidapi-key": "aec4b3ea07msha3618e894254591p168662jsnb96bf9a67318",
      "x-rapidapi-key": "33cd4a2c49mshf76dee9bb71dc52p1dff08jsn917a329ffdff",
      "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
    },
  };

  // Store the recipes object and display the recipes.
  $.ajax(spoonacularSettings).done(function (response) {
    recipesObject = response.recipes;
    displayRandom(response.recipes);
  });
}

// Display 3 Random Dishes with Title & Picture
function displayRandom(recipes) {
  // Show the three dishes and hide the recipe detail and map containers.
  hideUnhideDiv("dish-display");

  // Clear out anything that may be in the random recipes image container.
  $(".randomRecipes").html("");

  // Loop through the recipes object and build out the random recipes
  // cards with the three dish titles and images.
  for (var i = 0; i < recipes.length; i++) {
    var cellEl = $("<div>").attr("class", "columns large-4 medium-4");
    var cardEl = $("<div>").attr("class", "card randomRecipeCard");
    cellEl.append(cardEl);

    var title = recipes[i].title;
    var titleEl = $("<div>")
      .attr("class", "card-section randomCardTitle")
      .html("<h5>" + title + "</h5>");

    var imgEl = $("<img>")
      .attr("src", recipes[i].image)
      .attr("alt", recipes[i].title)
      .attr("class", "randomRecipePicture dropBtn");

    // Link on image to display the drop-down menu for
    // recipe or restaurant
    var aEl = $("<a>")
      .attr("class", "recipe-click")
      .attr("href", "#")
      .attr("data-index", i)
      .append(imgEl); //need this to make image become clickable

    // Add drop down options of eating in or eating out to each recipe card but don't display unless image is clicked
    var dropDown = $("<div>").attr("class", "dropdown-content");
    var inEl = $("<a href='#' class='showRecipe'>Get The Recipe</a>").attr(
      "data-index",
      i
    );

    // Build the dropdown menu under each dish card: "Get the Recipe", "Find a Restaurant Near You"
    var outEl = $(
      "<a href='# class='showRestaurant'>Find A Restaurant Near You</a>"
    ).attr("data-title", title);

    dropDown.append(inEl).append($("<hr>")).append(outEl).hide();
    cardEl.append(titleEl).append(aEl).append(dropDown);
    $(".randomRecipes").append(cellEl);

    // Add event listnener to user choice for eat in or eat out.

    // Get the Recipe click event
    inEl.click(function () {
      var index = $(this).attr("data-index");
      displayRecipeDetail(recipes[index]);
    });

    // Find a Restaurant Near You click event
    outEl.click(function () {
      // Store title in localstorage for map.js to grab.
      localStorage.setItem("searchTitle", $(this).attr("data-title"));

      // Unhide the map-container div and hide the recipe-details element
      // and the three dish element.
      hideUnhideDiv("map-container");

      $("#showMap").trigger("click");
    });
  }

  // Add event listener to images to show the drop down menu.
  $(".recipe-click").on("click", function (event) {
    //hide all the dropdown
    $(".dropdown-content").hide();
    //only show the drop down of selected card
    var dropDown = $(this).next();

    // This is the <a> tag and dropdown is next sibling node/element.
    if (dropDown.is(":hidden")) {
      dropDown.show();
    }

    //this is the <a> tag and dropdown is next sibling node/element
    // var selectedIndex = $(this).attr("data-index");

    //toggle the rest of cards: if it's shown, then hide the rest; if it's hidden, then show the rest
    // $(".recipe-click").each(function (index, element) {
    //   var cardIndex = index;
    //   if (cardIndex != selectedIndex) {
    //     var cardEl = $(element).parent(); //get the whole card instead of the clickable image

    //     // if cards
    //     if (cardEl.is(":hidden")) {
    //       cardEl.show();
    //     } else {
    //       cardEl.hide();
    //     }
    //   }
    // });
  });
}

// Hide drop down
window.onclick = function (event) {
  if (!event.target.matches(".dropBtn")) {
    $(".dropdown-content").hide();
  }
};

// --------Display Recipe Details (Johanna)
// Hide or unhide sections depending on what was clicked.
// Parameter divToUnhide is the element ID to unhide.
function hideUnhideDiv(divToUnhide) {
  // Get the three elements: the three dish display element,
  // the recipe detail element, and the map container element.
  var dishDisplay = document.getElementById("dish-display");
  var recipeDetails = document.getElementById("recipe-details");
  var mapContainer = document.getElementById("map-container");

  // Only one of these elements should display at the same time.
  // If one is being displayed then the other two should be hidden.
  switch (divToUnhide) {
    case "dish-display":
      dishDisplay.classList.remove("hide");
      recipeDetails.classList.add("hide");
      mapContainer.classList.add("hide");
      break;
    case "recipe-details":
      recipeDetails.classList.remove("hide");
      dishDisplay.classList.add("hide");
      mapContainer.classList.add("hide");
      break;
    case "map-container":
      mapContainer.classList.remove("hide");
      dishDisplay.classList.add("hide");
      recipeDetails.classList.add("hide");

      $("#dishTitle").text(
        "Searching Results For:" + " " + localStorage.getItem("searchTitle")
      );
      break;
  }
  if ($("#dish-display").hasClass("hide")) {
    $("#back-button").removeClass("hide");
  } else {
    $("#back-button").addClass("hide");
  }
}

// DISPLAY RECIPE DETAILS
function displayRecipeDetail(singleRecipe) {
  // Unhide the recipe-details element, hide the map-container div and the the three dish element.
  hideUnhideDiv("recipe-details");

  // Clear the image container for the recipe and the summary.
  $(".recipeDetailsPic").empty();
  $(".recipeDetailsSummary").empty();
  $("#recipeTitle").empty();

  // Build the recipe detail container with the image of the dish and its summary.

  // Add the image.
  var imgEl = $("<img>")
    .attr("src", singleRecipe.image)
    .attr("alt", singleRecipe.title)
    .attr("class", "singleRecipePicture");
  $(".recipeDetailsPic").append(imgEl);

  var title = $("<h4>").text(singleRecipe.title).attr("id", "titleRecipe");
  var summary = singleRecipe.summary;
  var detailsEl = $("<p>").html("<p>" + summary + "</p>");
  var aEl = $("<a>")
    .attr("href", singleRecipe.sourceUrl)
    .html(singleRecipe.sourceUrl);
  detailsEl.append(aEl);
  $("#recipeTitle").append(title);
  $(".recipeDetailsSummary").append(detailsEl);
}

// User Interaction =====================================

// When the user clicks the "What's for Dinner" button
// call the function to generate three random dishes
// and display them.
$("#whatsfordinner").on("click", function () {
  randomRecipeContainer.classList.remove("hide");
  startCallout.classList.add("hide");
  $("#regenerate-button").removeClass("hide");
  //generate and display 3 recipes
  generateRandomRecipes();
});

// -- Regenerate choices button
$("#regenerate-button").on("click", function () {
  generateRandomRecipes();
});

$("#back-button").on("click", function () {
  $(this).addClass("hide");
  hideUnhideDiv("dish-display");
});

// When the user clicks an image of a recipe
// on the recipe list page (page 3) call a
// function to display the recipe detail page.
