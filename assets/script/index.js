const orizzontaliContainer = document.getElementById('orizzontaliContainer');
document.getElementById("grissinbon").innerHTML = grissinbon();
const homeBtn = document.getElementById('homeBtn');
const homeContainer = document.getElementById('homeContainer');
const searchBtn= document.getElementById('searchBtn');
const searchContainer = document.getElementById('searchContainer');
const searchInput = document.getElementById('searchInput');
const searchInputBtn = document.getElementById('searchInputBtn');
const url = 'https://deezerdevs-deezer.p.rapidapi.com/search?q=';
const options = {
    method: 'GET',
	headers: {
		'X-RapidAPI-Key': '5e9533492cmshc7bda6f6c4226a8p18d33djsnce600cc50cb3',
		'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
	}
}

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

const init = () => {
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