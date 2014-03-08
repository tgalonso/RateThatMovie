/*
So this is what needs to get accomplished.
You need to 
1. retrieve the info from RottenTomatoes URL and store it in a
object. var movie, maybe.
2. parse the info to retrieve certain info.
 JSON retrieves 1 object, with 3 name:value pairs.

*/
$(document).ready(function() {
//declaring necessary global variables
var movieTitle;
var movieRating;
var actors = []; //this will be an array
var movieJSON;
                  
//here we get the movie title.
$("input").keyup(function() {
    movieTitle = $(this).val(); //getting movie title, one letter at a time.
});
                  


}); //end of jquery doc