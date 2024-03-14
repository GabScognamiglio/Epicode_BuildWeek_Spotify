
const urlArtist = 'https://corsproxy.io/?https://api.deezer.com/artist/'
const artistName = document.getElementById("artistName");
const fanNumber = document.getElementById("fanNumber");
const artistImage = document.getElementById("artistImage");
let arrayArtist = [];



async function searchArtistId (id) {
    
    try {
        const response = await fetch(urlArtist+id+'/top?limit=5');
        const result = await response.json();
        console.log(result)
        const responseIdArtist = await fetch(urlArtist + id);
        const resultIdArtist = await responseIdArtist.json();
        console.log(resultIdArtist) //oggetto

        arrayArtist = result.data;
        console.log(arrayArtist);
        populateArtistFirst(arrayArtist[0].artist.name, resultIdArtist.nb_fan, resultIdArtist.picture_xl)
       
    }
     catch (error) {
        console.log(error);
    }
    
}

function populateArtistFirst (nameArtist, numberFan, imageArtist) {
    artistName.innerText = nameArtist;
    fanNumber.innerText = numberFan +' followers';
    artistImage.style.backgroundImage = `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9)), url(${imageArtist})`;
   
}

const init = () => {
    const urlArtist = new URL(window.location.href); 
    const searchParams = urlArtist.searchParams;
    const idProduct = searchParams.get('id');
    searchArtistId(idProduct);

}

window.onload = function () {
    init();
}








`<div class="row">
<div class="col-1 text-end newclass pt-2">
  <p>1</p>
</div>
<div class="col-1">
  <img
    src="${imgUrl}"
    alt="" width="40px" />
</div>
<div class="col-6 px-4">
  <p class="title pt-2">
    ${title}
  </p>
</div>
<div class="col-md-2 newclass pt-2">
  <p>${numberFan}</p>
</div>
<div class="col-md-2 px-4 newclass pt-2">
  <p>${duration}</p>
</div>
</div>`