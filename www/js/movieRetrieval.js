
$(document).ready(function() {
//declaring necessary global variables

$.support.cors = true;
var movieJSON;
var data; //will hold the json obj with the data.
                  
    //here we get the movie title.
    $('input').keyup(function() {
            movieTitle = $(this).val(); //getting movie title, one letter at a time.
    });
                  
    $('#go').click(function() {
        movieTitle = encodeURI(movieTitle);
        console.log("Click was registered");
        $.ajax({
            url:'http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=cq8unxj24dtamwv2fwjwqdmq&q='+movieTitle+'&page_limit=4',
            dataType: 'jsonp',
            async: 'false',
            success: function(JSONObject) {
               $('#title').append(JSONObject.movies[0].title);
               console.log("1");
               $('#rating').append(JSONObject.movies[0].ratings.critics_score);
               console.log("2");
               $('#actor1').append(JSONObject.movies[0].abridged_cast[0].name);
               console.log("3");
               $('#actor2').append(JSONObject.movies[0].abridged_cast[1].name);
               console.log("4");
               $('#actor3').append(JSONObject.movies[0].abridged_cast[2].name);
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