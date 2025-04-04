const apiKey = "8a6a445c4228acc2be50aac6cc07ffab";
const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const weatherDesc = document.getElementById("weather-desc");
const icon = document.getElementById("icon");

// Fetch weather data from API
async function getWeather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();

    if (data.cod === "404") {
      alert("City not found. Please try again.");
      return;
    }

    updateWeatherUI(data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    alert("An error occurred. Please try again later.");
  }
}

// Update UI with weather data
function updateWeatherUI(data) {
  cityName.textContent = data.name;
  temperature.textContent = `${Math.round(data.main.temp)}°C`;
  humidity.textContent = `${data.main.humidity}%`;
  wind.textContent = `${data.wind.speed} km/h`;
  weatherDesc.textContent = data.weather[0].description;

  // Update weather icon based on conditions
  const weatherId = data.weather[0].id;
  if (weatherId >= 200 && weatherId < 300) {
    icon.className = "fas fa-bolt"; // Thunderstorm
  } else if (weatherId >= 300 && weatherId < 500) {
    icon.className = "fas fa-cloud-rain"; // Drizzle/Rain
  } else if (weatherId >= 500 && weatherId < 600) {
    icon.className = "fas fa-umbrella"; // Rain
  } else if (weatherId >= 600 && weatherId < 700) {
    icon.className = "fas fa-snowflake"; // Snow
  } else if (weatherId >= 700 && weatherId < 800) {
    icon.className = "fas fa-smog"; // Fog/Mist
  } else if (weatherId === 800) {
    icon.className = "fas fa-sun"; // Clear sky
  } else {
    icon.className = "fas fa-cloud"; // Clouds
  }
}

// Event listeners
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) getWeather(city);
});

cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const city = cityInput.value.trim();
    if (city) getWeather(city);
  }
});

// Load default city on startup
getWeather("London"); // Optional: Replace with user's location