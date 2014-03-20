/*
So this is what needs to get accomplished.
You need to 
1. retrieve the info from RottenTomatoes URL and store it in a
object. var movie, maybe.
2. parse the info to retrieve certain info.
 JSON retrieves 1 object, with 3 name:value pairs.

*/
var $j = jQuery.noConflict();

$j(document).ready(function() {
//declaring necessary global variables

                   $j.support.cors = true;
var movieJSON;
var data; //will hold the json obj with the data.
                  
    //here we get the movie title.
    $j('input').keyup(function() {
            movieTitle = $j(this).val(); //getting movie title, one letter at a time.
    });
                  
    $j('#go').click(function() {
        movieTitle = encodeURI(movieTitle);
        console.log("Click was registered");
        $j.ajax({
            url:'http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=cq8unxj24dtamwv2fwjwqdmq&q='+movieTitle+'&page_limit=4',
            dataType: 'jsonp',
            async: 'false',
            success: function(JSONObject) {
               $j('#title').append(JSONObject.movies[0].title);
               console.log("1");
               $j('#rating').append(JSONObject.movies[0].ratings.critics_score);
               console.log("2");
               $j('#actor1').append(JSONObject.movies[0].abridged_cast[0].name);
               console.log("3");
               $j('#actor2').append(JSONObject.movies[0].abridged_cast[1].name);
               console.log("4");
               #j('#actor3').append(JSONobject.movies[0].abridged_cast[2].name);
               console.log("Done.");
               //saving the JSON from Rotten Tomatoes in data variable
               saveObj(JSONObject);
            }
        });
    });
                  
    function saveObj(JSONObject) {
        data = JSONObject;
    };
    //Assuming we'll only be using the one html file, we can use data to populate other stuff/fields in rotten tomatoes.


}); //end of jquery doc