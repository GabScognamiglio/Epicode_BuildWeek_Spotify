
const urlArtist = 'https://corsproxy.io/?https://api.deezer.com/artist/'
const artistName = document.getElementById("artistName");
const fanNumber = document.getElementById("fanNumber");
const artistImage = document.getElementById("artistImage");
let arrayArtist = [];
const popolari = document.getElementById('popolari')


async function searchArtistId(id) {

  try {
    const response = await fetch(urlArtist + id + '/top?limit=10');
    const result = await response.json();
    console.log(result)
    const responseIdArtist = await fetch(urlArtist + id);
    const resultIdArtist = await responseIdArtist.json();
    console.log(resultIdArtist) //oggetto

    arrayArtist = result.data;
    console.log(arrayArtist);
    populateArtistFirst(arrayArtist[0].artist.name, resultIdArtist.nb_fan, resultIdArtist.picture_xl)
    populatePopolari(arrayArtist);
  }
  catch (error) {
    console.log(error);
  }

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
      <p class="title pt-2">
        ${array[i].title}
      </p>
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