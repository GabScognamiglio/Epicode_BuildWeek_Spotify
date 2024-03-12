const orizzontaliContainer = document.getElementById('orizzontaliContainer');
document.getElementById("grissinbon").innerHTML = grissinbon();


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

