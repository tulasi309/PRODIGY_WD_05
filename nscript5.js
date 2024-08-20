const apiKey = 'f99987db7802604ca71a24aff426aa74'; // Replace with your OpenWeatherMap API key

function getWeatherByLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetchWeatherData(`lat=${lat}&lon=${lon}`);
        }, (error) => {
            alert('Unable to retrieve your location');
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

function getWeatherByUserInput() {
    const location = document.getElementById('locationInput').value;
    fetchWeatherData(`q=${location}`);
}

function fetchWeatherData(query) {
    const url = `https://api.openweathermap.org/data/2.5/weather?${query}&units=metric&appid=${apiKey}`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayWeatherData(data))
        .catch(error => alert('Error fetching weather data'));
}

function displayWeatherData(data) {
    if (data.cod !== 200) {
        alert(data.message);
        return;
    }

    const weatherInfo = document.getElementById('weatherInfo');
    const weatherDescription = data.weather[0].description;
    const temperature = data.main.temp;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;

    weatherInfo.innerHTML = `
        <h2>Weather in ${data.name}, ${data.sys.country}</h2>
        <p>${weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1)}</p>
        <p>Temperature: ${temperature}°C</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
    `;
}