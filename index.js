function getweather() {
    const city = document.getElementById("city").value;
    if (!city) {
        alert('Please enter a city');
        return;
    }

    const apiKey = 'a55855434b8b86167998ac5c3ad647c2';
    const currentWeatherUrl = https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey};
    const forecastUrl = https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey};

    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            displayCurrentWeather(data);
        })
        .catch(error => {
            console.error('Error fetching current weather data:', error);
            alert('Error fetching current weather data. Please try again.');
        });   fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            displayHourlyForecast(data.list);
        })
        .catch(error => {
            console.error('Error fetching hourly forecast data:', error);
            alert('Error fetching hourly forecast data. Please try again.');
        });
}
function displayCurrentWeather(data) {
    const tempDiv = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');

    const cityName = data.name;
    const temperature = Math.round(data.main.temp - 273.15);
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconUrl = https://openweathermap.org/img/wn/${iconCode}.png;

    tempDiv.textContent = ${temperature}°C;
    weatherInfoDiv.textContent = ${cityName}: ${description};
    weatherIcon.src = iconUrl;
}

function displayHourlyForecast(data) {
    const hourlyForecastDiv = document.getElementById('Hourly-forecast');
    hourlyForecastDiv.innerHTML = '';

    for (let i = 0; i < data.length; i += 8) {
        const forecast = data[i];
        const forecastTime = new Date(forecast.dt * 1000);
        const forecastTemperature = Math.round(forecast.main.temp - 273.15);
        const forecastDescription = forecast.weather[0].description;

        const forecastItem = document.createElement('div');
        forecastItem.textContent = ${forecastTime.toLocaleString()}: ${forecastTemperature}°C, ${forecastDescription};
        hourlyForecastDiv.appendChild(forecastItem);
    }
}
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('data.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running');
});