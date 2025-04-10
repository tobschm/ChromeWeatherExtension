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
            const windspeed = data.current_weather.windspeed;
            const winddirection = data.current_weather.winddirection;
            let direction;
            if (winddirection >= 337.5 || winddirection < 22.5) {
                direction = "N";
            } else if (winddirection >= 22.5 && winddirection < 67.5) {
                direction = "NE";
            } else if (winddirection >= 67.5 && winddirection < 112.5) {
                direction = "E";
            } else if (winddirection >= 112.5 && winddirection < 157.5) {
                direction = "SE";
            } else if (winddirection >= 157.5 && winddirection < 202.5) {
                direction = "S";
            } else if (winddirection >= 202.5 && winddirection < 247.5) {
                direction = "SW";
            } else if (winddirection >= 247.5 && winddirection < 292.5) {
                direction = "W";
            } else if (winddirection >= 292.5 && winddirection < 337.5) {
                direction = "NW";
            }
            
            document.getElementById("temperature").innerHTML = `Temperature: ${temp}°C`;
            document.getElementById("wind").innerHTML = `Wind: ${windspeed} km/h ${direction}`;
        })
        .catch(error => {
            console.error("Error retreiving weather data:", error);
        });
}

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
    chrome.storage.local.set({ city: city }, function() {
        console.log('Saved city:', city);
      });
}

document.getElementById("getWeather").addEventListener("click", function() {
    const city = document.getElementById("city").value;
    fetchWeatherDataByCity(city);
});
init();