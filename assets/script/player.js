const url = 'https://deezerdevs-deezer.p.rapidapi.com/search?q=bellofigo';
const options = {
    method: 'GET',
	headers: {
		'X-RapidAPI-Key': '5e9533492cmshc7bda6f6c4226a8p18d33djsnce600cc50cb3',
		'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
	}
}
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

const music = new Audio();

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
  if (isPlaying) {
    pauseMusic();
  } else {
    playMusic();
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
    background.src = song[musicIndex].cover;
  
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
  const width = playerProgress.clientWidth;
  const clickX = e.offsetX;
  music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener("click", togglePlay);
prevBtn.addEventListener("click", () => changeMusic(-1));
nextBtn.addEventListener("click", () => changeMusic(1));
music.addEventListener("ended", () => changeMusic(1));

music.addEventListener("timeupdate", updateProgressBar);
playerProgress.addEventListener("click", setProgressBar);




async function musicFetch () {
    
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        fetchSongs = result.data;
       

       songs = fetchSongs.map(songData => ({
          
          path: songData.preview,
          displayName: songData.title,
          cover: songData.artist.picture_big,
          artist: songData.artist.name,

        }));
        loadMusic(songs, 0)
       
    }
     catch (error) {
        console.error(error);
    }
    
}



const init = () =>{
        musicFetch();
       

}

window.onload = () => {
    init();
}


