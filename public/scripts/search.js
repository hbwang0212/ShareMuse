
$('#song-search').on('input', function() {
  var search = $(this).serialize();
  if(search === "search=") {
    search = "all"
  }
  $.get('/songs?' + search, function(data) {
    $('#song-grid').html('');
    data.forEach(function(song) {
      $('#song-grid').append(`
        <div class="col-md-3 col-sm-6">
          <div class="thumbnail">
            <img src="${ song.image }">
            <div class="caption">
              <h4>${ song.song_name }</h4>
            </div>
            <p>
              <a href="/songs/${ song._id }" class="btn btn-primary">More Info</a>
            </p>
          </div>
        </div>
      `);
    });
  });
});

$('#song-search').submit(function(event) {
  event.preventDefault();
});