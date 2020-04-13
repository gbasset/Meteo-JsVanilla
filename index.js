const urlBase = 'https://api.openweathermap.org/data/2.5/'
const key = '&APPID=d83fed33ce7c2eeb1cebef9636060e78&units=metric'
const temperature = document.querySelector('#temperature_label')
const day = document.querySelector('.day')
const feel = document.querySelector('.feel')
const city = document.querySelector('#ville')
const min = document.querySelector('.min')
const max = document.querySelector('.max')
const humid = document.querySelector('.humid')
const windV = document.querySelector('.windV')
const windD = document.querySelector('.windD')
let formulaire = document.querySelector('#formulaire')
let changer = document.querySelector('#changer')
let input = document.querySelector('#input')
let jours = new Array('Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi');
const optionsD = { year: 'numeric', month: 'long', day: 'numeric' };
let options = { enableHightAccuracy: true }
let dateOfTheDay = new Date()
let dateString = jours[dateOfTheDay.getDay()] + ' ' + dateOfTheDay.toLocaleString('fr-FR', optionsD)
console.log('dateOfTheDay', dateOfTheDay);
const options2 = {
    year: 'numeric', month: 'numeric', day: 'numeric'
};
console.log("dateOfTheDay date string", dateOfTheDay.getFullYear() + '-' + '0' + (dateOfTheDay.getMonth() + 1) + '-' + dateOfTheDay.getDate())

day.innerHTML = dateString

let ville = ''


inputCity = () => {
    ville = input.value
    // Number 13 is the "Enter" key on the keyboard
    console.log('ville.length', ville.length);
    console.log(input.value
    )

}
input.addEventListener("keyup", inputCity);
function error() {
    villeChoisie = 'Paris'
    ville = 'Paris'
    recevoirTemperature('paris')
}
if ('geolocation' in navigator && (ville.length === 0)) {
    navigator.geolocation.watchPosition((position) => {
        let url = `${urlBase}weather?lon=${position.coords.longitude}&lat=${position.coords.latitude}${key}`
        let request = new XMLHttpRequest()
        request.open("GET", url)
        request.responseType = 'json'
        request.send()
        request.onload = function () {
            if (request.readyState === XMLHttpRequest.DONE) {
                if (request.status === 200) {
                    let reponse = request.response
                    console.log(reponse);
                    city.innerHTML = reponse.name
                    temperature.innerHTML = reponse.main.temp
                    feel.innerHTML = reponse.main.feels_like + ' ‎°C'
                    min.innerHTML = reponse.main.temp_min + ' ‎°C'
                    max.innerHTML = reponse.main.temp_max + ' ‎°C'
                    humid.innerHTML = reponse.main.humidity
                    windV.innerHTML = reponse.wind.speed + ' k/h'
                    windD.innerHTML = reponse.wind.deg + ' Degrés'
                    let leverSoleil = Date(reponse.sys.sunrise)
                }
            }

        }
    }, error, options)
}
else {

}
// let villeChoisie = ''

function recevoirTemperature(villeChoisie) {
    ville = villeChoisie
    let url = `${urlBase}weather?q=${ville}${key}`
    let requete = new XMLHttpRequest()
    requete.open("GET", url)
    requete.responseType = 'json'
    requete.send()
    requete.onload = function () {
        if (requete.readyState === XMLHttpRequest.DONE) {
            if (requete.status === 200) {
                let reponse = requete.response
                console.log(reponse);
                city.innerHTML = ville
                temperature.innerHTML = reponse.main.temp
                feel.innerHTML = reponse.main.feels_like + ' ‎°C'
                min.innerHTML = reponse.main.temp_min + ' ‎°C'
                max.innerHTML = reponse.main.temp_max + ' ‎°C'
                humid.innerHTML = reponse.main.humidity
                windV.innerHTML = reponse.wind.speed + ' k/h'
                windD.innerHTML = reponse.wind.deg + ' Degrés'
                let leverSoleil = Date(reponse.sys.sunrise)
                //let val = reponse.main.temp
                // function temperatureConverter(valNum) {
                //     console.log(valNum);
                //     let total = parseFloat((valNum - 32 * 5) / 9).toFixed(2);
                //     console.log(total);
                //     temperature.innerHTML = total
                // }
                // temperatureConverter(val)

            }
            else {
                alert("un pb est survenu")
            }
        }

    }
}

let changeCity = () => {
    console.log('ville  recherché', ville);
    recevoirTemperature(ville)
    // recevoirTemperaturePlusieursJours(ville)
}
changer.addEventListener('click', changeCity)

// function recevoirTemperaturePlusieursJours(villeChoisie) {
//     ville = villeChoisie
//     let forecast = `${urlBase}forecast?q=${ville}${key}`
//     //api.openweathermap.org/data/2.5/forecast?q={city name}&appid={your api key}
//     // 8 temperature par jours
//     //https://api.meteo-concept.com/pricing
//     let requete = new XMLHttpRequest()
//     requete.open("GET", forecast)
//     requete.responseType = 'json'
//     requete.send()
//     requete.onload = function () {
//         if (requete.readyState === XMLHttpRequest.DONE) {
//             if (requete.status === 200) {
//                 let reponsePlusieursJours = requete.response
//                 console.log("reponsePlusieursJours", reponsePlusieursJours);
//                 let oneDay = reponsePlusieursJours.list

//                 let dateDuJours = new Date(oneDay[0].dt)



//             }
//             else {
//                 alert("un pb est survenu pour +")
//             }
//         }

//     }
// }
// recevoirTemperaturePlusieursJours(ville)

document.addEventListener("keydown", function (event) {
    if (event.keyCode == 13) {
        event.preventDefault();
        return false;
    }
}, true); // "true" => phase de capture