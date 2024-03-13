
/* ricerche nostre */
let mozart = 'mozart';
let paul = 'paulkalbrenner';
let metallica = 'master of puppets';
let fabriFibra = 'mr.simpatia';

const orizzontaliContainer = document.getElementById('orizzontaliContainer');
document.getElementById("grissinbon").innerHTML = grissinbon();
const homeBtn = document.getElementById('homeBtn');
const homeContainer = document.getElementById('homeContainer');
const searchBtn= document.getElementById('searchBtn');
const searchContainer = document.getElementById('searchContainer');
const searchInput = document.getElementById('searchInput');
const searchInputBtn = document.getElementById('searchInputBtn');
const url = 'https://deezerdevs-deezer.p.rapidapi.com/search?q=';
const urlAlbum = 'https://deezerdevs-deezer.p.rapidapi.com/album/'
const options = {
    method: 'GET',
	headers: {
		'X-RapidAPI-Key': '5e9533492cmshc7bda6f6c4226a8p18d33djsnce600cc50cb3',
		'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
	}
}
const immagineAnnuncio = document.getElementById('immagineAnnuncio')
const artistaMain = document.getElementById('artistaMain')
const titoloneMain = document.getElementById('titoloneMain');
const albumMain = document.getElementById ('albumMain');
const btnGreenPlay = document.getElementById ('btnGreenPlay');

const displayHome = () => {
    searchContainer.style.display = 'none';
    homeContainer.style.display = 'block';
}
const displaySearch = () => {
    searchContainer.style.display = 'block';
    homeContainer.style.display = 'none';
}

function grissinbon() {
    let ora = new Date().getHours();

    if (ora >= 6 && ora < 12) {
        return "Buongiorno";
    } else if (ora >= 12 && ora < 17) {
        return "Buon pomeriggio";
    } else if (ora >= 17 && ora < 23) {
        return "Buonasera";
    } else {
        return "Buonanotte";
    }
}

//ricerca in un array
// risultati in un array di un oggetto



async function searchAlbums (preferito){
    try {
        const response = await fetch(url+preferito, options);
        const result = await response.json();
        console.log(result);
        let albumId = result.data[0].album.id;
        try {
            const responseAlbum = await fetch(urlAlbum +albumId, options);
            const resultAlbum = await responseAlbum.json();
            console.log(resultAlbum);
            

        }
         catch (error) {
            console.error(error);
        }

    }
     catch (error) {
        console.error(error);
    }
}

async function searchFetch (textInput) {
    
    try {
        const response = await fetch(url+textInput, options);
        const result = await response.json();
        console.log(result);
       
    }
     catch (error) {
        console.error(error);
    }
    
}

function populateMainArtist (title, album,  imgUrl, artist, albumId) {
    titoloneMain.innerText = title;
    albumMain.innerHTML = `<a href="album.html?id=${albumId}">${album}</a>`;
    immagineAnnuncio.src = imgUrl;
    artistaMain.innerHTML = `<a href="artist.html?id=${artist}">${artist}</a>`;


}

function passaCanzone (title, artist, mp3Url, imageUrl){
    let songFetched = {
        title: title,
        artist: artist,
        mp3Url: mp3Url,
        imageUrl: imageUrl,
    }
    return songFetched
}

async function mainFetch (searchArtist) {
    try {
        const response = await fetch(url+searchArtist, options);
        const result = await response.json();
        let title = result.data[0].title;
        let album = result.data[0].album.title;
        let albumId = result.data[0].album.id;
        let imageUrl = result.data[0].album.cover_big;
        let artist = result.data[0].artist.name;
        let mp3Url = result.data[0].preview;

        populateMainArtist(title, album, imageUrl, artist, albumId);
       let musicFetched =  passaCanzone(title,artist,mp3Url,imageUrl);
       musicFetch(musicFetched)
    }
     catch (error) {
        console.error(error);
    }
    
}

btnGreenPlay.addEventListener('click', function(){
    togglePlay();
    if (isPlaying) {
        btnGreenPlay.innerText='Pause';
      } else {
        btnGreenPlay.innerText='Play';
      }

})

/* PLAYER */
let fetchSongs = [];
const image = document.getElementById("cover");
title = document.getElementById("music-title");
artist = document.getElementById("music-artist");
currentTimeEl = document.getElementById("current-time");
durationEl = document.getElementById("duration");
progress = document.getElementById("progress");
playerProgress = document.getElementById("player-progress");
prevBtn = document.getElementById("prev");
nextBtn = document.getElementById("next");
playBtn = document.getElementById("play");
background = document.getElementById("bg-img");
let progressbar = document.getElementById('progress-bar');
const music = new Audio();

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
  if (isPlaying) {
    pauseMusic();
    btnGreenPlay.innerText='Play';
  } else {
    playMusic();
    btnGreenPlay.innerText='Pause';
  }
}

function playMusic() {
  isPlaying = true;
  //cambiare il bottone del play
  playBtn.classList.replace("fa-play", "fa-pause");
  //settare hover del titolo del bottone
  playBtn.setAttribute("title", "Pause");
  music.play();
}


function cambioVolume(volume){
  
  music.volume = volume;

}

function pauseMusic() {
  isPlaying = false;
  //cambiare il bottone del play
  playBtn.classList.replace("fa-pause", "fa-play");
  //settare hover del titolo del bottone
  playBtn.setAttribute("title", "Play");
  music.pause();
}

function loadMusic(song, musicIndex) {
    cambioVolume(0.2)
    music.src = song[musicIndex].path;
    title.textContent = song[musicIndex].displayName;
    artist.textContent = song[musicIndex].artist;
   
    image.src = song[musicIndex].cover;
    //background.src = song[musicIndex].cover;
  
}

function changeMusic(direction) {
  musicIndex = (musicIndex + direction + songs.length) % songs.length;
  loadMusic(songs, musicIndex);
  playMusic();
}

function updateProgressBar() {
  const { duration, currentTime } = music;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
  
  const formatTime = (time) => String(Math.floor(time)).padStart(2, "0");
  /* durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(
    duration % 60
  )}`; */
  durationEl.textContent = '0:30';
  currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(
    currentTime % 60
  )}`;
}

function setProgressBar(e) {
  const width = progressbar.clientWidth;
  const clickX = e.offsetX;
  
  console.log(clickX)
  music.currentTime = (clickX / width) * music.duration;
 
}

playBtn.addEventListener("click", togglePlay);
prevBtn.addEventListener("click", () => changeMusic(-1));
nextBtn.addEventListener("click", () => changeMusic(1));
music.addEventListener("ended", () => changeMusic(1));

music.addEventListener("timeupdate", updateProgressBar);
progressbar.addEventListener("click", setProgressBar);





async function musicFetch (musicFetched) {
       songs = [
          {
            path: musicFetched.mp3Url,
            displayName: musicFetched.title,
            cover: musicFetched.imageUrl,
            artist: musicFetched.artist,
          }
        ]
         

        
        loadMusic(songs, 0)
       
    
}

/* CreateCardsHorizontal */
/* let horizontalCard = 
`<div class="col-12 col-md-4 col-xl-3">
<div class="row rounded-2">
  <div class="col-4 my-2 d-flex align-items-center"><img
      src="${imgurl}"
      alt="fotoAlbum" class="img-fluid">
  </div>
  <div class="col-8 my-2 fw-bold d-flex align-items-center flex-column">
    <a href='artist.html?id=${artist}'>${artist}</a>
    <a href='album.html?id=${albumId}'>${album}</a> 
  </div>
</div>
</div>`; */



/* INIT */
const init = () => {

    mainFetch(fabriFibra);
    searchAlbums(metallica);
    searchInputBtn.addEventListener('click', function(e){
        e.preventDefault();
        let textSearch = searchInput.value;
        searchFetch(textSearch);
        searchInput.value = ''
    })
}
window.onload = () => {
    init()
}