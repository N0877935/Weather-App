import './style.css';
import { kelvToCelc, kelvToFahr } from './calulations';

const input = document.getElementById('search');
const searchBtn = document.querySelector('.searchBtn');

searchBtn.addEventListener('click', getLatandLon);

async function getLatandLon() {

    try {
        const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${input.value}&limit=5&appid=a0378840c94dc468a6c0f10315d22343`, { mode: "cors"});
        const locationData = await response.json();
        const latitude = locationData[0].lat;
        const longitude = locationData[0].lon;
        getWeatherData(latitude, longitude);

    } catch(err){
        console.log(err.message);
        alert("Please enter a valid location");
    }

}

async function getWeatherData(lat, lon) {

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=a0378840c94dc468a6c0f10315d22343`, {mode: "cors"});
        const weatherData = await response.json();
        const name = weatherData.name;
        const description = weatherData.weather[0].description;
        const temp = weatherData.main.temp;
        const feelsLike = weatherData.main.feels_like;
        const humidity = weatherData.main.humidity;
        createDiv(name, description, temp, feelsLike, humidity);
    } catch(err) {
        console.log(err);
    }
}


function createDiv(title, divDesc, divTemp, divFeels, divHum) {
    

    const container = document.querySelector('.main-content');
    const div = document.createElement('div');
    const h2 = document.createElement('h2');
    const tempData = document.createElement('p');
    const feelData = document.createElement('p');
    const humData = document.createElement('p');
    const unitsContainer = document.createElement('div');
    const unitsLabel = document.createElement('p');
    const changeUnits = document.createElement('input');
    
    h2.textContent = `${title} - ${divDesc}`;
    tempData.textContent = `Temp: ${kelvToCelc(divTemp)}°C` // converted from Kelvin to Celcius and rounded to one decimal place 
    feelData.textContent = `Feels like: ${kelvToCelc(divFeels)}°C`;
    humData.textContent = `Humidity: ${divHum}%`
    unitsLabel.textContent = 'Change to Fahrenheit';
    
    container.appendChild(div);
    unitsContainer.append(unitsLabel, changeUnits);
    div.append(h2, tempData, feelData, humData, unitsContainer);
    div.classList.add('divStyle');
    changeUnits.type = "checkbox";
    unitsContainer.classList.add('unitsStyle')

    changeUnits.addEventListener('change', function(e){
        if(this.checked) {
            unitsLabel.textContent = 'Change to Celcius';
            tempData.textContent = `Temp: ${kelvToFahr(divTemp)}°F`;
            feelData.textContent = `Feels like: ${kelvToFahr(divFeels)}°F`;
        } else {
            unitsLabel.textContent = 'Change to Fahrenheit';
            tempData.textContent = `Temp: ${kelvToCelc(divTemp)}°C`;
        feelData.textContent = `Feels like: ${kelvToCelc(divFeels)}°C`;
        }
    })
}

