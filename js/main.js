$(document).foundation();

$('#randomGif').focus();

$('#generate').on('click', function() {
  var userSearch = document.getElementById("randomGif").value;

  $('#userGif iframe').attr('src', "");
  $.ajax({
      url:'http://api.giphy.com/v1/gifs/search?q='+userSearch+'&api_key=dc6zaTOxFJmzC&limit=50',
      success: function(results){
        if (results.data.length !== 0){
          
          //randomize gif from results
          function shuffle(array) {
            var currentIndex = array.length, temporaryValue, randomIndex;

            // While there remain elements to shuffle...
            while (0 !== currentIndex) {

              // Pick a remaining element...
              randomIndex = Math.floor(Math.random() * currentIndex);
              currentIndex -= 1;

              // And swap it with the current element.
              temporaryValue = array[currentIndex];
              array[currentIndex] = array[randomIndex];
              array[randomIndex] = temporaryValue;
            }

            return array;
          }

          shuffle(results.data);

          console.log(results.data[0])

          var gif = results.data[0].embed_url;
          var gifUrl = results.data[0].url;
          $('#userGif iframe').attr('src', gif);
          $('#shareInput').val(gifUrl);

          //set iframe size to requested image
          $('iframe').css({
            'width' : results.data[0].images.original.width, 
            'height' : results.data[0].images.original.height
          });                
        }
        else {
          if (!$('p.errorMsg')){
            $('#userGif').append('<p class="errorMsg">Sorry! This Gif does not exist</p>');
          }
        }


      },
      error: function() {
          if (!$('p.errorMsg')){
            $('#userGif').append('<p class="errorMsg">Sorry! This Gif does not exist</p>');
          }
      }
  }); 
});  