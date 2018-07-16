var mongoose = require("mongoose");
var SpotifyWebApi = require('spotify-web-api-node');
var spotifyApi = new SpotifyWebApi()

var songSchema = new mongoose.Schema({
   song_name: String,
   author_name: String,
   release_date: String,
   image: String,
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   },
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});

module.exports = mongoose.model("Song", songSchema);