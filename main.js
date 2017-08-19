console.log("talking");

let submit = document.getElementById('submit');
submit.addEventListener('click', search, false);

function search() {
  let search_terms = document.getElementById('search_terms').value;
  console.log("search terms: "+search_terms);
  var encoded_search_terms = search_terms.replace(' ', '+').toLowerCase();
  console.log("encoded_search_terms: "+encoded_search_terms);

  fetch('https://itunes.apple.com/search?term='+encoded_search_terms)

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


        // Get the parent DIV, add click listener...
        row1.addEventListener("click",function(e) {
	      // e.target was the clicked element
          if (e.target && e.target.matches("img.thumbnail")) {
            console.log("Anchor element clicked!");
	         }
         });


        row1.innerHTML = '<div></div>' // clears previous search results
        for (var i = 0; i < data.results.length; i++) {
          let track = data.results[i].trackName;
          console.log("track: "+track)
          let artist = data.results[i].artistName;
          var thumbnail = data.results[i].artworkUrl100;
          var audio_preview = data.results[i].previewUrl;
          let itunes_track_url = data.results[i].trackViewUrl;
          let itunes_artist_url = data.results[i].artistViewUrl;

          let result = document.createElement("div");
            result.classList.add("result");
            result.setAttribute("href", itunes_track_url);
            let resultInfo = `
            <img class="thumbnail" src="${thumbnail}" />
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
