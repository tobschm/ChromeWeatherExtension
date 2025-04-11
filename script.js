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
            const winddirection = data.current_weather.winddirection;
            let direction;
            if (winddirection >= 337.5 || winddirection < 22.5) {
                direction = "North";
            } else if (winddirection >= 22.5 && winddirection < 67.5) {
                direction = "North-East";
            } else if (winddirection >= 67.5 && winddirection < 112.5) {
                direction = "East";
            } else if (winddirection >= 112.5 && winddirection < 157.5) {
                direction = "South-East";
            } else if (winddirection >= 157.5 && winddirection < 202.5) {
                direction = "South";
            } else if (winddirection >= 202.5 && winddirection < 247.5) {
                direction = "South-West";
            } else if (winddirection >= 247.5 && winddirection < 292.5) {
                direction = "West";
            } else if (winddirection >= 292.5 && winddirection < 337.5) {
                direction = "North-West";
            }

            document.getElementById("temperature").innerHTML = `Temperature: ${temp}°C`;
            document.getElementById("weatherCode").innerHTML = `Weather: ${weatherDescription}`;
            document.getElementById("wind").innerHTML = `Wind: ${windspeed} km/h ${direction}`;
        })
        .catch(error => {
            console.error("Error retreiving weather data:", error);
        });
}

function mapWeatherCode(code) {
    const weatherCodes = {
        0: "Clear sky",
        1: "Mainly clear",
        2: "Partly cloudy",
        3: "Overcast",
        45: "Fog",
        48: "Depositing rime fog",
        51: "Light drizzle",
        53: "Moderate drizzle",
        55: "Dense drizzle",
        56: "Light freezing drizzle",
        57: "Dense freezing drizzle",
        61: "Slight rain",
        63: "Moderate rain",
        65: "Heavy rain",
        66: "Light freezing rain",
        67: "Heavy freezing rain",
        71: "Slight snowfall",
        73: "Moderate snowfall",
        75: "Heavy snowfall",
        77: "Snow grains",
        80: "Slight rain showers",
        81: "Moderate rain showers",
        82: "Violent rain showers",
        85: "Slight snow showers",
        86: "Heavy snow showers",
        95: "Thunderstorm",
        96: "Thunderstorm with slight hail",
        99: "Thunderstorm with heavy hail"
    };

    return weatherCodes[code] || "Unknown weather code";
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
    chrome.storage.local.set({ city: city }, function () {
        console.log('Saved city:', city);
    });
}

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