const urlAlbum = 'https://corsproxy.io/?https://api.deezer.com/album/';
const albumName = document.getElementById("albumName");
const artistName = document.getElementById('artistName');
const albumDuration = document.getElementById("albumDuration");
const artistImageThumbnail  = document.getElementById("artistImageThumbnail");
const albumImage = document.getElementById("albumImage");
const nbTracks = document.getElementById('nbTracks');
const contenitoreTracce = document.getElementById('contenitoreTracce') //Kevin ☭ <3
const albumBackground = document.getElementById('albumBackground');

function populateTop(obj) {
    albumName.innerText= obj.title;
    albumDuration.innerText = secondsToMinutes(obj.duration);
    artistName.innerText = obj.artist.name;
    artistImageThumbnail.src = obj.artist.picture;
    nbTracks.innerText = obj.nb_tracks + ' brani';
    albumImage.src = obj.cover_big;
    albumBackground.style.backgroundImage = `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.9)), url(${obj.cover_xl})`;
    albumBackground.style.backdropFilter = 'filter(blur(50px))';
}

async function searchAlbumId(id) {

    try {
        const response = await fetch(urlAlbum + id);
        const result = await response.json();
        let album=result
        console.log(album)
        let tracklist = result.tracks.data;
        console.log(tracklist);
        populateTop(album);
        populateTracklist(tracklist);
        
    }
    catch (error) {
        console.log(error);
    }

}



function populateTracklist(array){
    for (let i=0; i<array.length; i++) {
        let traccia= document.createElement('div');
        traccia.classList.add('row');
        traccia.classList.add('my-3');

        traccia.innerHTML=`<div class="col-1 d-flex align-items-center justify-content-end">
        <p>${i+1}</p>
      </div>
      <div class="col-5 ps-4">
        <p class="fw-bold mb-1" id="music-title">${array[i].title}</p>
        <p class="mt-0">${array[i].artist.name}</p>
      </div>
      <div class="col-2 newclass">
        <p>${array[i].rank}</p>
      </div>
      <div class="col-2 px-4 newclass">
        <p>${secondsToMinutes(array[i].duration)}</p>
      </div>
        `

    contenitoreTracce.appendChild(traccia)    
    }
}


/*LIBRERIA*/
const contenitoreLibreria = document.getElementById('contenitoreLibreria')
const libreriaIdStatica = [401032, 610400, 401346, 109943, 531687612, 111209, 301784, 6856717];
let libreria = []
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '8285387448msh3de7dcef18a5d35p162bdfjsn1fef9a1ab463',
    'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
  }
}

async function fetchLibreria(array) {
  for (let i = 0; i < array.length; i++) {
    try {
      const response = await fetch(urlAlbum + array[i], options);
      const result = await response.json();
      libreria.push(result)
    }
    catch (error) {
      console.log(error);
    }
  }
  console.log(libreria)
  populateLibreria(libreria)
};

function populateLibreria(array){
  for (let i=0; i<array.length; i++){
    let div= document.createElement('div');
    div.classList.add('row');
    div.classList.add('my-3');
    // div.classList.add('backgroundGray');
    div.classList.add('albumLibreria');
    div.innerHTML=`
    <div class="col-4 col-xl-3 d-flex justify-content-center align-items-center">
              <img src="${array[i].cover_xl}" alt="..." class="img-fluid img-libreria">
            </div>
            <div class="col-8 col-xl-9 d-flex flex-column justify-content-center">
              <span class="fw-bold m-0"><a href="album.html?id=${array[i].id}">${array[i].title}</a></span>
              <span class="mb-0"><a href="artist.html?id=${array[i].artist.id}">${array[i].artist.name}</a></span>
            </div>
     </div>
    `

    contenitoreLibreria.appendChild(div);
  }
}




//trasfromare secondi in minuti
function secondsToMinutes(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedTime = `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
    return formattedTime || `${minutes}:00`; // Ritorna "minuti:00" se seconds è 0
  }

const init = () => {
    fetchLibreria(libreriaIdStatica);
    const urlArtist = new URL(window.location.href);
    const searchParams = urlArtist.searchParams;
    const idProduct = searchParams.get('id');
    searchAlbumId(idProduct);
    
}

window.onload = function () {
    init();
}
