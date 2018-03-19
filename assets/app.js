 // Initial array of animals
 var animals = ["Lion", "Tiger", "Eagle", "Parrot", "Duck", "Goose", "Sparrow", "Hummingbird", "Skunk", "Rabbit", "Frog", "Turtle", "Cheetah", "Bear", "Sheep", "Goat", "Rat", "Wolf", "Butterfly", "Puppy", "Gorilla", "Camel"];

 // displayAnimalInfo function re-renders the HTML to display the appropriate content
 function displayAnimalInfo() {

     var animal = $(this).attr("data-name");
     var api_key = "fGSIR7vbbg0uj8hKgIPoeHZGlQpFZBlR";
     var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&apikey=" + api_key + "&limit=10";

     // Creating an AJAX call for the specific movie button being clicked
     $.ajax({
         url: queryURL,
         method: "GET"
     }).then(function (response) {

         // Storing an array of results in the results variable
         var results = response.data;

         // Looping over every result item
         for (var i = 0; i < results.length; i++) {

             // Only taking action if the photo has an appropriate rating
             if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                 // Creating a div with the class "item"
                 var gifDiv = $("<div class='item'>");

                 // Storing the result item's rating
                 var rating = results[i].rating;

                 // Creating a paragraph tag with the result item's rating
                 var p = $("<p>").text("Rating: " + rating);

                 // Creating an image tag
                 var animalImage = $("<img class='unit'>");

                 // Giving the image tag an src attribute of a proprty pulled off the
                 // result item
                 animalImage.attr("src", results[i].images.fixed_height_still.url);

                 animalImage.attr({ 'data-still': results[i].images.fixed_height_still.url });

                 animalImage.attr({ 'data-animate': results[i].images.fixed_height.url });

                 animalImage.attr({ 'data-state': "still" });


                 // Appending the paragraph and animalImage we created to the "gifDiv" div we created
                 gifDiv.append(p);
                 gifDiv.append(animalImage);

                 // Prepending the gifDiv to the "#animals-view" div in the HTML
                 
                 $("#animals-view").prepend(gifDiv);


             }
         }

         $(".unit").on("click", function () {
             // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
             var state = $(this).attr("data-state");
             // If the clicked image's state is still, update its src attribute to what its data-animate value is.
             // Then, set the image's data-state to animate
             // Else set src to the data-still value
             if (state === "still") {
                 $(this).attr("src", $(this).attr("data-animate"));
                 $(this).attr("data-state", "animate");
             } else {
                 $(this).attr("src", $(this).attr("data-still"));
                 $(this).attr("data-state", "still");
             }
         });

     });

 }

 // Function for displaying animals data
 function renderButtons() {

     // Deleting the movies prior to adding new movies
     // (this is necessary otherwise you will have repeat buttons)
     $("#buttons-view").empty();

     // Looping through the array of movies
     for (var i = 0; i < animals.length; i++) {

         // Then dynamicaly generating buttons for each animal in the array
         // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
         var a = $("<button class='btn btn-info' style='margin: 5px;'>");
         // Adding a class of animal-btn to our button
         a.addClass("animal-btn");
         // Adding a data-attribute
         a.attr("data-name", animals[i]);
         // Providing the initial button text
         a.text(animals[i]);
         // Adding the button to the buttons-view div
         $("#buttons-view").append(a);
     }
 }

 // This function handles events where animal button is clicked
 $("#add-animal").on("click", function (event) {
     event.preventDefault();
     // This line grabs the input from the textbox
     var animal = $("#animal-input").val().trim();

     // Adding animal from the textbox to our array
     animals.push(animal);

     // Calling renderButtons which handles the processing of our animals array
     renderButtons();
 });

 // Adding a click event listener to all elements with a class of "movie-btn"
 $(document).on("click", ".animal-btn", displayAnimalInfo);

 // Calling the renderButtons function to display the intial buttons
 renderButtons();