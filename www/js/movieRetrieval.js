
$(document).ready(function() {
//declaring necessary global variables
$.support.cors = true; //setting jquery variable to allow cross-domain calls
var director;
var movieTitle; //just added this shit
var data; //will hold the json obj with the data.
var checkPoint = 0;
var actors = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]; //2D array holds 5 w/ 4 actors
var genre = [];
var movie_ids = [];
var choice = 0;
var title = []; //array will hold all the titles of the movie.
                  
                  
    //here we get the movie title.
    $('#search-mini').keyup(function(event) {
        movieTitle = $(this).val(); //getting movie title, one letter at a time.
    });
    //clearing the results page.
    $('#screen-one').click(function() {
        for(var index=0; index<5; i++) {
            $('#pic'+index).attr("src", "");
            $('#title'+index).html("");
            $('#year'+index).html("");
            actors = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]; //clearing out results for actors
        }
    });
    function clearVars() {
            for(var index=0; index<5; index++) {
                  $('#pic'+index).attr("src", "");
                  $('#title'+index).html("");
                  $('#year'+index).html("");
                  //actors = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]; //clearing out results for actors
                  choice = 0;
                  
            }
                   console.log("successfully cleared!");
    }
    //performs ajax call and displays info on results page.
    $('#go').click(function() {
                   console.log("Here.");
            clearVars();
                   console.log("not here");
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
                   if(JSONObject.total >= 18) {
                        inc = 5;
                   }
                   else {
                        inc = parseInt(JSONObject.total, 10);
                        console.log(inc);
                   }
                   for(var i=0; i<inc; i++) {
                        movie_ids[i]=JSONObject.movies[i].id;
                        console.log(movie_ids[i]);
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
    //this is the best I have.
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
     
    /** I need to be able to disabe the links for the movies that aren't populated by the list!
     preferrably
     1) get total as a global variable (the one in the ajax call)
     2) disable the links (using that one jquery call..) total -> 5
     3) no need to clear those values (total -> 5) since they will be replaced with a new search
    
     ALSO, I need to check if all 3 radio buttons are clicked before they can continue to the 
     rating pages.
     1) have a flag that's only true if all 3 buttons selected attribute = true
     2) turn off whenever it doesn't equal 3 (idk how to check this :O )
     **/
     
    /**
     So this function below is gonna be an important one. I need it to perform
     another ajax call to get the director and genres.
     */
    $('#hacktor').click(function() {
        //do ajax call to the specific movie json file.
        //retrieve the director names and the genres.
        //display those to the screen in
        $.ajax({
            url:'http://api.rottentomatoes.com/api/public/v1.0/movies/'+movie_ids[choice]+'.json?apikey=cq8unxj24dtamwv2fwjwqdmq',
            dataType: 'jsonp',
            async: 'false',
            success: function(JSONObject2) {
               //this should be a lot of shit, all you need is the genre's and director
               genre[0] = JSONObject2.genres[0];
               console.log("Do you watch "+ genre[0]);
               genre[1] = JSONObject2.genres[1];
               console.log("Do you watch" + genre[1]);
               director = JSONObject2.abridged_directors[0].name;
            }
        });
        //print actors' names.
        for(var k=0; k<4;k++) {
            $('#label'+k).html(actors[choice][k]);
        }
        
    });
    $('#to_genre_director').click(function() {
            $('#genre0').html(genre[0]);
            $('#genre1').html(genre[1]);
            $('#director').html(director);
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