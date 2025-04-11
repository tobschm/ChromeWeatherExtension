import { mapWindDirection, mapWeatherCode } from './mappings.js';

async function fetchWeatherData(latitude, longitude) {
    const url = new URL("https://api.open-meteo.com/v1/forecast");
    url.search = new URLSearchParams({
        latitude: latitude,
        longitude: longitude,
        current_weather: true
    });

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data.current_weather);
            const temp = data.current_weather.temperature;
            const weatherDescription = mapWeatherCode(data.current_weather.weathercode);
            const windspeed = data.current_weather.windspeed;
            const direction = mapWindDirection(data.current_weather.winddirection);

            document.getElementById("temperature").innerHTML = `Temperature: ${temp}°C`;
            document.getElementById("weatherCode").innerHTML = `Weather: ${weatherDescription}`;
            document.getElementById("wind").innerHTML = `Wind: ${windspeed} km/h ${direction}`;
        })
        .catch(error => {
            console.error("Error retreiving weather data:", error);
        });
}

// get position and fetch weather data
function fetchWeatherDataByCity(city) {
    const url = new URL("https://nominatim.openstreetmap.org/search?format=json&q=Berlin")
    url.search = new URLSearchParams({
        q: city,
        format: "json"
    });
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const latitude = data[0].lat;
            const longitude = data[0].lon;
            document.getElementById("headline").innerHTML = `Weather in ${city}`;
            fetchWeatherData(latitude, longitude);
            saveCity();
        })
        .catch(error => {
            console.error("Error retreiving weather data:", error);
        });
}

// get city from local storage and fetch weather data
function init() {
    chrome.storage.local.get("city", function (result) {
        if (result.city) {
            document.getElementById("city").value = result.city;
            fetchWeatherDataByCity(result.city);
        }
    });
}

function saveCity() {
    const city = document.getElementById("city").value;
    chrome.storage.local.set({ city: city }, function () {
        console.log('Saved city:', city);
    });
}

// Event listeners

document.getElementById("getWeather").addEventListener("click", function () {
    const city = document.getElementById("city").value;
    fetchWeatherDataByCity(city);
});

document.getElementById("city").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        const city = event.target.value;
        fetchWeatherDataByCity(city);
    }
});

init();