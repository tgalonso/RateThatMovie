
$(document).ready(function() {
//declaring necessary global variables
$.support.cors = true; //setting jquery variable to allow cross-domain calls
var movieJSON;
var movieTitle; //just added this shit
var data; //will hold the json obj with the data.
var checkPoint = 0;
var actors = [[],[],[],[],[]]; //2D array holds 5 arrays.
var choice;
var title = []; //array will hold all the titles of the movie.
    //here we get the movie title.
    $('#search-mini').keyup(function(event) {
        movieTitle = $(this).val(); //getting movie title, one letter at a time.
    });
    //clearing the results page.
    $('#home-search').click(function() {
        for(var i=0; i<5; i++) {
            $('#pic'+i).attr("src", "");
            $('#title'+i).html("");
            $('#year'+i).html("");
            actors = [[],[],[],[],[]]; //clearing out results for actors
        }
    });
    //performs ajax call and displays info on results page.
    $('#go').click(function() {
        
            if($('#search-mini').val() == "") {
                   $(this).attr("href", "#wrong-way");
            }
            else {
                   $(this).attr("href", "#results");
            }
            movieTitle = encodeURI(movieTitle);
            console.log("Click was registered");
                   //figure out a way to check the size of the movies array an populate list accordingly.
            $.ajax({
                   url:'http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=cq8unxj24dtamwv2fwjwqdmq&q='+movieTitle+'&page_limit=5',
                   dataType: 'jsonp',
                   async: 'false',
                   success: function(JSONObject) {
                   //populating results list & storing actors in a 2D array.
                   for(var i=0; i<5; i++) {
                        title[i] = JSONObject.movies[i].title;
                        $('#pic'+i).attr("src", JSONObject.movies[i].posters.profile);
                        $('#title'+i).html(JSONObject.movies[i].title);
                        $('#year'+i).html(JSONObject.movies[i].year);
                        for(var j=0; j<4; j++) {
                            //populate actors array[0-5] with movie[0-5].abridged_cast[0-4] names
                            actors[i][j] = JSONObject.movies[i].abridged_cast[j].name;
                        }
                   }
                   }
            });
    });
    //I would really like to make these click handlers more condensed. Right now,
    //this is the best I got.
    $('#movie0Link').click(function() {
            choice = 0;
    });
    $('#movie1Link').click(function() {
            choice = 1;
    });
    $('#movie2Link').click(function() {
            choice = 2;
    });
    $('#movie3Link').click(function() {
            choice = 3;
    });
    $('#movie4Link').click(function() {
            choice = 4;
    });
    /**
     So this function below is gonna be an important one. I need it to perform
     another ajax call to get the director and genres.
     */
    $('#hacktor').click(function() {
        //print actors' names.
        for(var k=0; k<4;k++) {
            $('#label'+k).html(actors[choice][k]);
        }
    });
                  
    //represent column and name
    var col, button;
    //this does the mutual excusivity for buttons
    $("input[type=radio]").click(function() {
        button = $(this);
        col = button.data("col");
        //here we check to see if a button at that column is already checked. If so, make it unchecked.
        $("input[data-col=\"" + col + "\"]").prop("checked", false);
        button.prop("checked", true);
        //jQuery Mobile radiobuttons need this line to reflect changes done after clicks.
        $("input[type='radio']").checkboxradio("refresh");
                                 
    });

}); //end of jquery doc