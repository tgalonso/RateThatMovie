
$(document).ready(function() {
//declaring necessary global variables
$.support.cors = true; //setting jquery variable to allow cross-domain calls
var movieJSON;
var data; //will hold the json obj with the data.
                  
    //here we get the movie title.
    $('input').keyup(function() {
            movieTitle = $(this).val(); //getting movie title, one letter at a time.
    });
    //performs ajax call and displays info on results page.
    $('#go').click(function() {
        movieTitle = encodeURI(movieTitle);
        console.log("Click was registered");
        $.ajax({
            url:'http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=cq8unxj24dtamwv2fwjwqdmq&q='+movieTitle+'&page_limit=4',
            dataType: 'jsonp',
            async: 'false',
            success: function(JSONObject) {
               //saving the JSON from Rotten Tomatoes in data variable
               for(var i=0; i<4; i++) {
                    $('#pic'+i).attr("src", JSONObject.movies[i].posters.profile);
                    $('#title'+i).html(JSONObject.movies[i].title);
                    $('#year'+i).html(JSONObject.movies[i].year);
               }
   
               saveObj(JSONObject);
               
            }
        });
        
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

     //This function just saves the data in a variable so we can use it later.
    function saveObj(JSONObject) {
        data = JSONObject;
    };



}); //end of jquery doc