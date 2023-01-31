

// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=a0378840c94dc468a6c0f10315d22343
// http://api.openweathermap.org/geo/1.0/direct?q=Ipswich&limit=5&appid=a0378840c94dc468a6c0f10315d22343
// get latitude and longitude from the Geolocation API 
const input = document.getElementById('search');
const searchBtn = document.querySelector('.searchBtn');
let longitude;
let latitude;

class weatherData {
    constructor(latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }

}

 function getLatandLon() {
    searchBtn.addEventListener('click', async () => {
        const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${input.value}&limit=5&appid=a0378840c94dc468a6c0f10315d22343`, { mode: "cors"});
        const locationData = await response.json();
        console.log(locationData);
        latitude = locationData[0].lat;
        longitude = locationData[0].lon;
        return {latitude, longitude};
    });
}



    getLatandLon();