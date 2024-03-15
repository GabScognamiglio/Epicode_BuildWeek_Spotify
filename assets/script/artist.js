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
playGreen = document.getElementById('playGreen');
background = document.getElementById("bg-img");
let progressbar = document.getElementById('progress-bar');
const music = new Audio();

let musicIndex = 0;
let isPlaying = false;
const urlArtist = 'https://corsproxy.io/?https://api.deezer.com/artist/'
const artistName = document.getElementById("artistName");
const fanNumber = document.getElementById("fanNumber");
const artistImage = document.getElementById("artistImage");
let arrayArtist = [];
const popolari = document.getElementById('popolari')
let arraySongs = [];



async function searchArtistId(id) {

  try {
    const response = await fetch(urlArtist + id + '/top?limit=10');
    const result = await response.json();
    console.log(result)
    const responseIdArtist = await fetch(urlArtist + id);
    const resultIdArtist = await responseIdArtist.json();
    console.log(resultIdArtist) //oggetto

    arrayArtist = result.data;
    arraySongs = result.data.map(songData => ({
          
      path: songData.preview,
      displayName: songData.title,
      cover: songData.album.cover_medium,
      artist: songData.artist.name,

    }));
    console.log(arraySongs)
    
    populateArtistFirst(arrayArtist[0].artist.name, resultIdArtist.nb_fan, resultIdArtist.picture_xl)
    populatePopolari(arrayArtist);
    playFirstSong(arraySongs[0].path, arraySongs[0].displayName, arraySongs[0].artist, arraySongs[0].cover)
  }
  catch (error) {
    console.log(error);
  }

}

function playFirstSong(musicSrc, titleText, artistText, imageSrc){
  music.src = musicSrc;
    
  title.textContent = titleText;
  artist.textContent = artistText;
  
  image.src = imageSrc;
 
 // background.src = backgroundSrc;
}

function populateArtistFirst(nameArtist, numberFan, imageArtist) {
  artistName.innerText = nameArtist;
  fanNumber.innerText = numberFan + ' followers';
  artistImage.style.backgroundImage = `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9)), url(${imageArtist})`;
}


//trasfromare secondi in minuti
function secondsToMinutes(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedTime = `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  return formattedTime || `${minutes}:00`; // Ritorna "minuti:00" se seconds è 0
}



function populatePopolari(array) {
  for (let i = 0; i < array.length; i++) {
    let cardPopolare = document.createElement('div'); //<div>----</div>
    cardPopolare.classList.add('row');
    cardPopolare.innerHTML =
      `<div class="col-1 text-end newclass pt-2">
      <p>${i + 1}</p>
    </div>
    <div class="col-1">
      <img
        src="${array[i].album.cover_medium}"
        alt="" width="40px" />
    </div>
    <div class="col-6 px-4">
    <button class='btn' onclick='playFirstSong(arraySongs[${i}].path, arraySongs[${i}].displayName, arraySongs[${i}].artist, arraySongs[${i}].cover)'>
      <p class="title pt-2">
        ${array[i].title}
      </p>
      </button>
    </div>
    <div class="col-md-2 newclass pt-2">
      <p>${array[i].rank}</p>
    </div>
    <div class="col-md-2 px-4 newclass pt-2">
      <p>${secondsToMinutes(array[i].duration)}</p>
    </div>`

    popolari.append(cardPopolare);
  }
}



/*LIBRERIA*/
const contenitoreLibreria = document.getElementById('contenitoreLibreria')
const libreriaIdStatica = [401032, 610400, 401346, 109943, 531687612, 111209, 301784, 6856717];
let libreria = []
const urlAlbum = 'https://corsproxy.io/?https://api.deezer.com/album/';
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



/* Player */


function togglePlay() {
  if (isPlaying) {
    pauseMusic();
   // playGreen.innerText='Play';
  } else {
    playMusic();
    //playGreen.innerText='Pause';
  }
}

function playMusic() {
  isPlaying = true;
  //cambiare il bottone del play
  playBtn.classList.replace("fa-play", "fa-pause");
  playGreen.classList.replace('fa-place', 'fa-pause');
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
  playGreen.classList.replace("fa-pause", "fa-play")
  //settare hover del titolo del bottone
  playBtn.setAttribute("title", "Play");

  music.pause();
}
function changeMusic(direction) {

  musicIndex = (musicIndex + direction + arraySongs.length) % arraySongs.length;
  music.src = arraySongs[musicIndex].path;
    title.textContent = arraySongs[musicIndex].displayName;
    artist.textContent = arraySongs[musicIndex].artist;
   
    image.src = arraySongs[musicIndex].cover;
    //background.src = arraySongs[musicIndex].cover;
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
playGreen.addEventListener('click', togglePlay);
prevBtn.addEventListener("click", () => changeMusic(-1));
nextBtn.addEventListener("click", () => changeMusic(1));
music.addEventListener("ended", () => changeMusic(1));

music.addEventListener("timeupdate", updateProgressBar);
progressbar.addEventListener("click", setProgressBar);

const init = () => {
  fetchLibreria(libreriaIdStatica)
  const urlArtist = new URL(window.location.href);
  const searchParams = urlArtist.searchParams;
  const idProduct = searchParams.get('id');
  searchArtistId(idProduct);

}

window.onload = function () {
  init();
}