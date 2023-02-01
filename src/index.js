import './style.css';

const input = document.getElementById('search');
const searchBtn = document.querySelector('.searchBtn');

searchBtn.addEventListener('click', getLatandLon);

async function getLatandLon() {
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${input.value}&limit=5&appid=a0378840c94dc468a6c0f10315d22343`, { mode: "cors"});
        const locationData = await response.json();
        const latitude = locationData[0].lat;
        const longitude = locationData[0].lon;
        getWeatherData(latitude, longitude);

}

async function getWeatherData(lat, lon) {
    
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=a0378840c94dc468a6c0f10315d22343`, {mode: "cors"});
    const weatherData = await response.json();
    const name = weatherData.name;
    const temp = weatherData.main.temp;
    const feelsLike = weatherData.main.feels_like;
    createDiv(name, temp, feelsLike);
}


function createDiv(divName, divTemp, divFeels) {
    const div = document.createElement('div');
    const h2 = document.createElement('h2');
    const tempData = document.createElement('p');
    const feelData = document.createElement('p');

    div.classList.add('divStyle');
}

// error handling