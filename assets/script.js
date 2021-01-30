// Dependencies ==========================================
// - DOM Elements
// - variables

// Get the DOM elements to hide when initially loading page.
var recipeImageContainer = document.getElementById("recipe-image-container");
var startCallout = document.getElementById("startCallout");
var displayMap = document.getElementById("display-map");
var restaurantList = document.getElementById("restaurant-list");

// When initially loading page, hide the map, recipe list, and
// display map button.
// recipeImageContainer.classList.add("hide");
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
          "x-rapidapi-key": "130332a6ccmshd9ecdd5f1b0a4d7p12e090jsnf616f928de59",
          "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        },
      };
      
      $.ajax(spoonacularSettings).done(function (response) {
        recipesObject = response.recipes;
        // console.log(recipesObject);
        displayRandom(response.recipes);
      });
}


// Display 3 Random Dishes with Title & Picture
function displayRandom(recipes) {
    $(".recipes").html("");

  for (var i = 0; i < recipes.length; i++) {
    var cellEl = $("<div>") 
      .attr("class", "columns large-4");
    var cardEl = $("<card>");
    var title = recipes[i].title;
    var titleEl = $("<div>") 
      .attr("class", "card-section randomDishCard") 
      .html("<h5>" + title + "</h5>");
    var imgEl = $("<img>") 
      .attr("src", recipes[i].image)
      .attr("alt", recipes[i].title);
    var aEl = $("<a>").attr("class", "recipe-click")
      .attr("href", "#")
      .append(imgEl); //need this to make image become clickable
    
    //add drop down options of eating in or eating out to each recipe card but don't display unless image is clicked
    //TODO add class and styles for drop down options
    var dropDown = $("<div>");
    var inEl = $("<a href='#' class='showRecipe'>Cook in</a>").attr("data-index", i);
    var outEl = $("<a href='# class='showRestaurant'>Eat out</a>").attr("data-title", title);
    dropDown.append(inEl).append($("<hr>")).append(outEl).hide();
    cellEl.append(cardEl).append(titleEl).append(aEl).append(dropDown);
    $(".randomRecipes").append(cellEl);

    //add event listnener to user choice for eat in or eat out
    inEl.click(function() {
        var index = $(this).attr("data-index");
        displayRecipeDetail(recipes[index]);
    });

    outEl.click(function() {
        //store title in localstorage for map.js to grab
        localStorage.setItem("searchTitle", $(this).attr("data-title"));
        $("#showMap").trigger( "click" ) ;
    });
  }

  //add event listener to images to show the drop down menu
  $(".recipe-click").on("click", function () {
  $(this).next().show(); //this is the <a> tag and dropdown is next sibling node/element
  

});

}

//TODO: call this function to dynamically generate contents in recipe details div (id = "recipe-details")
// Display Recipe Details
function displayRecipeDetail(singleRecipe) {

    //TODO: change here, recipes object contains all the information including: ingridient, instruction, etc
    //-----------------------your code should replace this part--------------------/
    var title = singleRecipe.title;
    var instructions = singleRecipe.instructions;
    var liEl = $("<li>").html(
      "<h4>" + title + "</h4><p>" + instructions + "</p>"
    );
    var aEl = $("<a>")
      .attr("href", singleRecipe.sourceUrl)
      .text(singleRecipe.sourceUrl);
    liEl.append(aEl);
    $(".recipes").append(liEl);
    //----------------------your code ends here-------------------------------
 
}

// User Interaction =====================================

// When the user clicks the "What's for Dinner" button (on page 1)
// call the function to generate three random dishes
// and display them.
$("#whatsfordinner").on("click", function () {
    recipeImageContainer.classList.remove("hide");
    startCallout.classList.add("hide");
    //generate and display 3 recipes
    generateRandomRecipes();
  });

// When the user clicks on the "Regenerate" button
// (on page 2) call a function to get three
// different random recipes and display them.
$("#regenerate-button").on("click", function () {
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
