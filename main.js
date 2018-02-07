console.log("talking");

let submit = document.getElementById('submit');
submit.addEventListener('click', search, false);

// Hitting Enter initiates search
document.onkeypress = keyPress;
function keyPress(e){
  var x = e || window.event;
  var key = (x.keyCode || x.which);
  if(key == 13 || key == 3){
    search();
  }
}

// Search begins here:
function search() {
  let search_terms = document.getElementById('search_terms').value;
  var encoded_search_terms = search_terms.replace(' ', '+').toLowerCase();

  fetch('https://itunes.apple.com/search?term='+encoded_search_terms)

  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
        response.status);
        return;
      }

      response.json().then(function(data) {
        let row1 = document.getElementById('row1');
        row1.innerHTML = '' // clears previous search results

        // play song when album artwork is clicked
        row1.addEventListener("click",function(e) {
          if (e.target && e.target.matches("img.thumbnail")) {
            let audio = document.getElementsByTagName('audio')[0];
            audio.setAttribute('src',e.target.id);
            let now_playing = document.getElementById('now_playing');
            let now_playing_image = document.getElementById('now_playing_image');
            let current_track = e.target.parentElement.getElementsByClassName('track')[0].innerText;
            let current_artist = e.target.parentElement.getElementsByClassName('artist')[0].innerText;
            // let current_thumbnail = e.target.src;
            now_playing_image.setAttribute('src', e.target.src)
            now_playing.innerHTML = `Now Playing: ${current_track} by ${current_artist}`
          }
        });

        // populates page with search results
        for (var i = 0; i < data.results.length; i++) {
          let track = data.results[i].trackName;
          let artist = data.results[i].artistName;
          var thumbnail = data.results[i].artworkUrl100;
          var audio_preview = data.results[i].previewUrl;
          let itunes_track_url = data.results[i].trackViewUrl;
          let itunes_artist_url = data.results[i].artistViewUrl;

          let result = document.createElement("div");
          result.classList.add("result");
          result.setAttribute("href", itunes_track_url);
          let resultInfo = `
          <img class="thumbnail" src="${thumbnail}" id="${audio_preview}" />
          <a href="${itunes_track_url}">
          <p class="track" >${track}</p>
          </a>
          <a href="${itunes_artist_url}">
          <p class="artist">${artist}</p>
          </a>
          </div>
          `;
          row1.appendChild(result);
          result.innerHTML = resultInfo;
        }})})};
