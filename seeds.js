var mongoose = require("mongoose");
var Song = require("./models/song");
var Comment   = require("./models/comment");
var SpotifyWebApi = require('spotify-web-api-node');
var spotifyApi = new SpotifyWebApi({
  clientId: 'fa7a751a081b4841bd53d986bdaf1d4f',
  clientSecret: '2201035b2cb94877abe7c25bbd4196f7',
});
var stuff = [];
// Retrieve an access token.
function seedDB(){
    Song.remove({}, function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log('removed songs');
            getCred();
        }
    });
}
function getCred(){
    spotifyApi.clientCredentialsGrant().then(
      function(data) {
        console.log('The access token expires in ' + data.body['expires_in']);
        console.log('The access token is ' + data.body['access_token']);

        // Save the access token so that it's used in future calls
        spotifyApi.setAccessToken(data.body['access_token']);
        spotifyApi.getNewReleases({ limit : 12, offset: 0, country: 'US' })
        .then(function(data) {
            console.log(data);
            data.body["albums"]["items"].forEach(function(item){
                Song.create({
                    song_name: item["name"],
                    author_name: item.artists[0].name,
                    release_date: item["release_date"],
                    image: item.images[0].url,
                }, function(err, song){
                    if(err) {
                     console.log("Something went wrong!", err);
                 }
                 else{
                    console.log(song.author_name);
                    song.save();
                    stuff.push(song);
                    Song.create(song, function(err, song){
                        if(err){
                            console.log(err)
                        }
                        else{
                            song.save();
                            console.log("added song");
                        }
                    });
                }
            });
            });
        });
    },
    function(err) {
        console.log('Something went wrong when retrieving an access token', err);
    }
    );
}

module.exports = seedDB;
