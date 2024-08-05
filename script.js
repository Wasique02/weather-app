const inputBox = document.getElementById('input-box');
const searchBtn = document.getElementById('search-btn');
const weatherImg = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidityPercentage = document.getElementById('humidity-percent');
const windSpeed = document.getElementById('wind-speed');
const locationNotFound = document.querySelector('.location-not-found');
const weatherBody = document.querySelector('.weather-body');

async function checkWeather(city) {
    const apiKey = "7943a73e1759267c2a4559b09e2b11ce";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const weatherData = await fetch(`${url}`).then(response => response.json());

    if(weatherData.cod === '404'){
        locationNotFound.style.display = 'flex';
        weatherBody.style.display = 'none';
        return;
    }
    
    locationNotFound.style.display = 'none';
    weatherBody.style.display = 'flex';
    temperature.innerHTML = `${Math.round(weatherData.main.temp - 273.15)}&deg;c`;
    description.innerHTML = `${weatherData.weather[0].description}`;
    humidityPercentage.innerHTML = `${weatherData.main.humidity}%`;
    windSpeed.innerHTML = `${weatherData.wind.speed}Km/H`;
    console.log(weatherData);
    switch (weatherData.weather[0].main) {
        case 'Clouds':
            weatherImg.src = "/assets/cloud.png"
            break;
        case 'Clear':
            weatherImg.src = "/assets/clear.png"
            break;
        case 'Rain':
            weatherImg.src = "/assets/rain.png"
            break;
        case 'Mist':
            weatherImg.src = "/assets/mist.png"
            break;
        case 'Snow':
            weatherImg.src = "/assets/snow.png"
            break;
    }
}

searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value)
})