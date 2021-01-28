// // ---------------Google Places AJAX Call ---------------

// query URL with two parameters Location and api key
var location = "Brooklyn+NewYork";
var APIkey = "AIzaSyB4CRiYoGBXcZ0BS3z8UK1lFFILHs3VOKQ";
var queryURL =
  "https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+toronto+canada&key=" +
  APIkey;

//---------- ajaz call ---------
$.ajax({
  url: queryURL,
  method: "GET",
}).then(function (response) {
  console.log(response);
});
