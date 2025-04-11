export function mapWindDirection(winddirection) {
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
    return direction;
}

export function mapWeatherCode(code) {
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

// changes the shadow of the result element according to the weather code
export function changeResultCss(weatherCode) {
    if(weatherCode == 0 ) { // sunny
        document.getElementById("result").style.boxShadow = "0 0 25px rgb(197, 138, 11)";
    }
    if(weatherCode > 1 && weatherCode <= 48) { // cloudy
        document.getElementById("result").style.boxShadow = "0 0 25px rgba(204, 203, 203, 0.5)";
    }
    if(weatherCode > 48 && weatherCode <= 67) { // rain
        document.getElementById("result").style.boxShadow = "0 0 25px rgba(30, 221, 221, 0.5)";
    }
    if(weatherCode > 67 && weatherCode <= 77) { // snow
        document.getElementById("result").style.boxShadow = "0 0 45px rgba(255, 255, 255, 0.5)";
    }
    if(weatherCode > 77 && weatherCode <= 82) { // heavy rain
        document.getElementById("result").style.boxShadow = "0 0 45px rgba(30, 221, 221, 0.5)";
    }
    if(weatherCode > 82 && weatherCode <= 86) { // heavy snow
        document.getElementById("result").style.boxShadow = "0 0 45px rgba(255, 255, 255, 0.5)";
    }
    if(weatherCode > 86) { // thunderstorm
        document.getElementById("result").style.boxShadow = "0 0 25px rgba(154, 149, 41, 0.5)";
    }
}