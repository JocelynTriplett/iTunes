console.log("talking");

let submit = document.getElementById('submit');
submit.addEventListener('click', search, false);

function search() {
  let search_terms = document.getElementById('search_terms').value;
  console.log("search terms: "+search_terms);
  var encoded_search_terms = search_terms.replace(' ', '+').toLowerCase();
  console.log("encoded_search_terms: "+encoded_search_terms);

  fetch('https://itunes.apple.com/search?term='+encoded_search_terms+'&limit=15')

  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
        response.status);
        return;
      }

      response.json().then(function(data) {
        console.log(data);
        let row1 = document.getElementById('row1');
        let row2 = document.getElementById('row2');
        let row3 = document.getElementById('row3');
        row1.innerHTML = '<div></div>' // clears previous search results
        row2.innerHTML = '<div></div>'
        row3.innerHTML = '<div></div>'
        for (var i = 0; i < 15; i++) {
          let track = data.results[i].trackName;
          console.log("track: "+track)
          let artist = data.results[i].artistName;
          var thumbnail = data.results[i].artworkUrl100;
          var audio_preview = data.results[i].previewUrl;
          let itunes_track_url = data.results[i].trackViewUrl;
          let itunes_artist_url = data.results[i].artistViewUrl;

          let result = document.createElement("a");
            result.setAttribute("href", itunes_track_url);
            let resultInfo = `
            <div>
            <img src="${thumbnail}" />
            <p>${track}</p>
            <p>${artist}</p>
            </div>
            `
            if (i<5){
              row1.appendChild(result);
              result.innerHTML = resultInfo;
            }
            else if (i>4 && i<10){
              row2.appendChild(result);
              result.innerHTML = resultInfo;
            }
            else {
              row3.appendChild(result);
              result.innerHTML = resultInfo;
            }


      }})})};
