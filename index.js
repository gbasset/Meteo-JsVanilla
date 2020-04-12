const urlBase = 'https://api.openweathermap.org/data/2.5/weather?q='
const key = '&APPID=d83fed33ce7c2eeb1cebef9636060e78&units=metric'
const temperature = document.querySelector('#temperature_label')
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
let ville = 'Toulouse';

function recevoirTemperature(villeChoisie) {
    ville = villeChoisie
    let url = `${urlBase}${ville}${key}`
    let request = new XMLHttpRequest()
    request.open("GET", url)
    request.responseType = 'json'
    request.send()
    input.addEventListener('keyup', () => {
        ville = input.value
        console.log(input.value
        )
        console.log('ville', ville);


    })
    request.onload = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                let reponse = request.response
                console.log(reponse);
                city.innerHTML = ville
                temperature.innerHTML = reponse.main.temp
                feel.innerHTML = reponse.main.feels_like + ' ‎°C'
                min.innerHTML = reponse.main.temp_min + ' ‎°C'
                max.innerHTML = reponse.main.temp_max + ' ‎°C'
                humid.innerHTML = reponse.main.humidity
                windV.innerHTML = reponse.wind.speed + ' k/h'
                windD.innerHTML = reponse.wind.deg + ' Degrés'
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
recevoirTemperature('toulouse')
let changeCity = () => {
    console.log('ville  recherché', ville);
    recevoirTemperature(ville)
}
changer.addEventListener('click', changeCity)