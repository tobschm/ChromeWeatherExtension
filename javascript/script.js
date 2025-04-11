import { mapWindDirection, mapWeatherCode, changeResultCss } from './mappings.js';

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
            changeResultCss(data.current_weather.weathercode);
            const windspeed = data.current_weather.windspeed;
            const direction = mapWindDirection(data.current_weather.winddirection);

            document.getElementById("temperature").innerHTML = `Temperature: ${temp}°C`;
            document.getElementById("weatherCode").innerHTML = `Weather: ${weatherDescription}`;
            document.getElementById("wind").innerHTML = `Wind: ${windspeed} km/h ${direction}`;
        })
        .catch(error => {
            displayError(error.message);
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
            displayError(error.message);
            console.error("Error retreiving weather data:", error);
        });
}

function displayError(message) {
    document.getElementById("headline").innerHTML = message;
    document.getElementById("temperature").innerHTML = ``;
    document.getElementById("weatherCode").innerHTML = ``;
    document.getElementById("wind").innerHTML = ``;
}

// get city from local storage and fetch weather data
function init() {
    chrome.storage.local.get("location", function (result) {
        if (result.location) {
            document.getElementById("locationField").value = result.location;
            fetchWeatherDataByCity(result.location);
        }
    });
}

function saveCity() {
    const location = document.getElementById("locationField").value;
    chrome.storage.local.set({ location: location }, function () {
        console.log('Saved city:', location);
    });
}

// Event listeners

document.getElementById("getWeather").addEventListener("click", function () {
    const location = document.getElementById("locationField").value;
    fetchWeatherDataByCity(location);
});

document.getElementById("locationField").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        const location = event.target.value;
        fetchWeatherDataByCity(location);
    }
});

init();