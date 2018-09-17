require("dotenv").config();
var moment = require("moment");
var request = require("request");
var fs = require("fs");


var spotifyKeys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(spotifyKeys.spotify);

var song = process.argv.slice(3).join("+");

var command = process.argv[2];


// SPOTIFY
spotify.search({ type: 'track', query: song , limit: 3 }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 

  if (command === "spotify-this-song"){
    console.log(data.tracks.items[0].artists[0]);
    console.log(data.tracks.items[0].name);
    console.log(data.tracks.items[0].preview_url);
    console.log(data.tracks.items[0].album.name);
  }
 
 
});

// BANDS
var artist = process.argv.slice(3).join("+");

request("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp", function(error, response, body) {

  if (command === "concert-this") {

    var parser = JSON.parse(body);
    for (var i=0; i < parser.length; i++){
      console.log(parser[i].venue.name)
      console.log(parser[i].venue.city)
      console.log(parser[i].venue.country)
      console.log(moment(parser[i].datetime).format("MM/DD/YYYY") + "\n")
      
    }

  }
});


// MOVIES

var movieName = process.argv.slice(3).join("+");
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

request(queryUrl, function(error, response, body) {

  
  if (command === "movie-this") {
  var movieParsed = JSON.parse(body);
   console.log(movieParsed.Title);
   console.log("Year: " + movieParsed.Year);
   console.log("imdb Rating: " + movieParsed.imdbRating);
   console.log("Rating: " + movieParsed.Ratings[1].Source + " " + movieParsed.Ratings[1].Value);
   console.log("Produced in: " + movieParsed.Country);
   console.log("Language: " + movieParsed.Language);
   console.log("Summary: " + movieParsed.Plot);
   console.log("Actors: " + movieParsed.Actors);
  }
});

// WRITE TEXT
// fs.writeFile("random.txt", "spotify-this-song I Want It That Wasy", function(err) {

//   console.log("ADDED SOMETHING");

// });



  if (command === "do-what-it-says"){
    fs.readFile("random.txt", "utf8", function(error, res) {
      console.log(res);
    });

    
  }
 
  








   
 