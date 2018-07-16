
  $('#play').on('click', function(event){
     play({
       playerInstance: new Spotify.Player({ name: "..." }),
       spotify_uri: 'spotify:track:7xGfFoTpQ2E7fRF5lN10tr',
     });
   });

    $('#play').submit(function(event) {
  event.preventDefault();
});
