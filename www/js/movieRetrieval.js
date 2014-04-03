
$(document).ready(function() {
//declaring necessary global variables
$.support.cors = true; //setting jquery variable to allow cross-domain calls
var movieJSON;
var data; //will hold the json obj with the data.
//var output='<ul data-role="listview" data-filter="true">';
                  
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
                   //output += '<li>';
                    $('#pic'+i).html("<img src=\""+JSONObject.movies[i].posters.profile+"\"/>");
                    //output += "<img id=\"moviepic\" class=\"moviepic\" src=\""+JSONObject.movies[i].posters.profile+"\"/>";
                    $('#title'+i).html(JSONObject.movies[i].title);
                   //output += " ";
                   //output += JSONObject.movies[i].title;
                    $('#year'+i).html(JSONObject.movies[i].year);
                   //output += " ";
                   //output += JSONObject.movies[i].year;
                   //output += '</li>';
               }
   
               saveObj(JSONObject);
               //output+='</ul>';
               //$('#postlist').html(output);
            }
        });
        
    });
    
    //represent column and name
    var col, name;
    //this does the mutual excusivity for buttons
    $("input[type=radio]").click(function() {
            name = $(this);
            col = name.data("col");
            
            $("input[data-col=" + col + "]").prop("checked", false);
            name.prop("checked", true);
            //Necessary line. Quirk in JQueryMobile requires this line whenever radiobutton stuff is done with JS                                 
            $("input[type='radio']").attr("checked",true).checkboxradio("refresh");
                                 
    });

                  
    function saveObj(JSONObject) {
        data = JSONObject;
    };
        
    
    //Assuming we'll only be using the one html file, we can use data to populate other stuff/fields in rotten tomatoes.


}); //end of jquery doc