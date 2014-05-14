
$(document).ready(function() {
//declaring necessary global variables
$.support.cors = true; //setting jquery variable to allow cross-domain calls
var movieJSON;
var movieTitle; //just added this shit
var data; //will hold the json obj with the data.
var checkPoint = 0;
var actors = [[],[],[],[],[]]; //array holds 5 arrays.
var choice=0;
                  
    //here we get the movie title.
    $('#search-mini').keyup(function(event) {
        movieTitle = $(this).val(); //getting movie title, one letter at a time.
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
            $.ajax({
                   url:'http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=cq8unxj24dtamwv2fwjwqdmq&q='+movieTitle+'&page_limit=5',
                   dataType: 'jsonp',
                   async: 'false',
                   success: function(JSONObject) {
                   //populating results list & storing actors in a 2D array.
                   for(var i=0; i<5; i++) {
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
    $('#hacktor').click(function() {
            //print choice's movie's first actor.
            $('#label1').html(actors[choice][0]);

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