async function fetchWeatherData() {
    fetch("https://api.open-meteo.com/v1/forecast?latitude=48.224861&longitude=10.103935&current_weather=true")
        .then(response => response.json())
        .then(data => {
            
            console.log(data.current_weather);
            const temp = data.current_weather.temperature;
            const windspeed = data.current_weather.windspeed;
            const winddirection= data.current_weather.winddirection
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
            
            document.getElementById("temperature").innerHTML = `Temperatur: ${temp}°C`;
            document.getElementById("wind").innerHTML = `Wind: ${windspeed} km/h ${direction}`;
        })
        .catch(error => {
            console.error("Error retreiving weather data:", error);
        });
}

fetchWeatherData();