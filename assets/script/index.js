let arrayMusicPlaying = [];
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
		'X-RapidAPI-Key': '8285387448msh3de7dcef18a5d35p162bdfjsn1fef9a1ab463',
		'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
	}
}
const immagineAnnuncio = document.getElementById('immagineAnnuncio')
const artistaMain = document.getElementById('artistaMain')
const titoloneMain = document.getElementById('titoloneMain');
const albumMain = document.getElementById ('albumMain');
const btnGreenPlay = document.getElementById ('btnGreenPlay');


/* Search */
const imgRisultato1 = document.getElementById('imgRisultato1');
const titoloRisultato1 = document.getElementById('titoloRisultato1');
const artistaRisultato1 = document.getElementById('artistaRisultato1');
const containerBraniSearch = document.getElementById('containerBraniSearch');
const resultsContainer = document.getElementById('resultsContainer');
const containerAlbumSearch = document.getElementById('containerAlbumSearch');
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

async function searchAlbums (preferito){
    try {
        const response = await fetch(url+preferito, options);
        const result = await response.json();
       
        let albumId = result.data[0].album.id;
        try {
            const responseAlbum = await fetch(urlAlbum +albumId, options);
            const resultAlbum = await responseAlbum.json();
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
        console.log(result)
        let searchedSongs = result.data;
        imgRisultato1.src = searchedSongs[0].album.cover_medium;
        titoloRisultato1.innerText = searchedSongs[0].title;

        artistaRisultato1.innerHTML = `<a href="artist.html?id=${searchedSongs[0].artist.id}">${searchedSongs[0].artist.name}</a>`
        containerBraniSearch.innerHTML = '';
        containerAlbumSearch.innerHTML = '';
       for(let i =1 ; i< 6; i++ ){
        let containerBrano = document.createElement('div');
        containerBrano.classList.add('container-fluid')
        containerBrano.classList.add('d-flex')
        containerBrano.classList.add('justify-content-between')
        containerBrano.classList.add('align-items-center')
        containerBrano.innerHTML = `<div class="d-flex">
        <img
          src="${searchedSongs[i].album.cover_medium}"
          alt="..." class="miniatura">
        <div class="d-flex flex-column justify-content-center">
          <p class="fs-5 fw-bold mb-0">${searchedSongs[i].title}</p>
          <p class="mb-0  \"><a href="artist.html?id=${searchedSongs[i].artist.id}">${searchedSongs[i].artist.name}</p>
        </div>
      </div>
      <div>
        <p class="mb-0">Durata</p>
      </div>`     

      let containerAlbum = document.createElement('div');
      containerAlbum.classList.add('col-12')
      containerAlbum.classList.add('col-md-4')
      containerAlbum.classList.add('col-xl-3')
      containerAlbum.classList.add('my-3')
      containerAlbum.innerHTML = ` <div class="card border-0" style="width: 12rem;">
      <img
        src="${searchedSongs[i].album.cover_medium}"
        class="card-img-top p-2 rounded rounded-4" alt="...">
      <div class="card-body">
        <h5 class="card-title fw-bold fs-6"><a href="album.html?id=${searchedSongs[i].album.id}">${searchedSongs[i].album.title}</a></h5>
        <p class="card-text"><a href="artist.html?id=${searchedSongs[i].artist.id}">${searchedSongs[i].artist.name}</p>

      </div>
    </div>`    
    
    containerBraniSearch.append(containerBrano);
        containerAlbumSearch.append(containerAlbum);
  } 
       resultsContainer.classList.remove('d-none');
    }
     catch (error) {
        console.error(error);
    }
};

function populateMainArtist (title, album,  imgUrl, artist, albumId, artistId) {
    titoloneMain.innerText = title;
    albumMain.innerHTML = `<a href="album.html?id=${albumId}">${album}</a>`;
    immagineAnnuncio.src = imgUrl;
    artistaMain.innerHTML = `<a href="artist.html?id=${artistId}">${artist}</a>`;
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
        let artistId = result.data[0].artist.id;
        let mp3Url = result.data[0].preview;
      
        populateMainArtist(title, album, imageUrl, artist, albumId, artistId);
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

function changeMusic(direction, song) {
  console.log(direction, song)
  musicIndex = (musicIndex + direction + song.length) % song.length;
  console.log(musicIndex)
  loadMusic(song[direction], musicIndex);
  pauseMusic()
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
  

  music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener("click", togglePlay);
prevBtn.addEventListener("click", () => changeMusic(-1, arrayMusicPlaying));
nextBtn.addEventListener("click", () => changeMusic(1, arrayMusicPlaying));
music.addEventListener("ended", () => changeMusic(1, arrayMusicPlaying));

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


async function buongiornoFetch () {
  let albumIdScelti = [321004297, 51001312, 78839882, 144718432, 125628232, 384473747];
  let arraySongs = [];
  for (let i = 0; i<albumIdScelti.length; i++){
try {
    const response = await fetch(urlAlbum+albumIdScelti[i], options);
    const result = await response.json();

    let oggetto = {
      albumName : result.title,
      imgUrl : result.cover_xl,
      artistId : result.artist.id,
      artistName : result.artist.name,
      albumId : result.id,
    }

    arraySongs[i] = result.tracks.data.map(songData => ({
          
      path: songData.preview,
      displayName: songData.title,
      cover: songData.album.cover_medium,
      artist: songData.artist.name,

    }));
     
    arrayMusicPlaying.push(arraySongs[i])
   
   

  let horizontalCard = document.createElement('div');
  horizontalCard.classList.add('col-12');
  horizontalCard.classList.add('col-md-6');
  horizontalCard.classList.add('col-xl-4');
  horizontalCard.innerHTML=
`<div class="row rounded-2">
  <div class="col-4 my-2 d-flex align-items-center"><button onclick='loadMusic(arrayMusicPlaying[${i}], 0)' class='btn'><img
    
      src="${oggetto.imgUrl}"
      alt="fotoAlbum" class="img-fluid"></button>
  </div>
  <div class="col-8 my-2 d-flex flex-column">
    <a class='text-body-secondary' href='artist.html?id=${oggetto.artistId}'>${oggetto.artistName}</a>
    <a class='fw-bold' href='album.html?id=${oggetto.albumId}'>${oggetto.albumName}</a> 
  </div>
</div>`; 

orizzontaliContainer.append(horizontalCard);    
}
 catch (error) {
    console.error(error);
}
  }
  console.log(arrayMusicPlaying)
     loadMusic(arrayMusicPlaying[2], 0)
  console.log(arraySongs);
}


/*LIBRERIA*/
const contenitoreLibreria = document.getElementById('contenitoreLibreria')
const libreriaIdStatica = [401032, 610400, 401346, 109943, 531687612, 111209, 301784, 6856717];
let libreria = [];

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

/* INIT */
const init = () => {
  
    buongiornoFetch ();
    fetchLibreria(libreriaIdStatica);
    mainFetch(metallica); 
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