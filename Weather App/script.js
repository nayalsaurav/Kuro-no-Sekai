const apiKey = "d1845658f92b31c64bd94f06f7188c9c";
const searchArea = document.querySelector(".search-section");
const yourLocationBtn = document.querySelector(".btn-primary");
const searchLocationBtn = document.querySelector(".btn-secondary");
const weatherInfoArea = document.querySelector(".weather-info");
const grantLocationArea = document.querySelector(".grant-location-section");
const loader = document.querySelector(".loader");
const searchBtn = document.querySelector("[data-search-btn]");
const searchInput = document.querySelector("[data-search-input]");
const city = document.querySelector(".city");
const condition = document.querySelector(".condition");
const temperature = document.querySelector(".temperature");
const wind = document.querySelector("[data-wind-speed]");
const humidity = document.querySelector("[data-humidity]");
const cloud = document.querySelector("[data-cloud]");

// tab switching
searchLocationBtn.addEventListener("click", () => {
  searchLocationBtn.classList.add("button-active");
  yourLocationBtn.classList.remove("button-active");
  weatherInfoArea.style.display = "none";
  searchArea.style.display = "flex";
});
yourLocationBtn.addEventListener("click", () => {
  yourLocationBtn.classList.add("button-active");
  searchLocationBtn.classList.remove("button-active");
  weatherInfoArea.style.display = "flex";
  searchArea.style.display = "none";
});

// search weather using city name
searchBtn.addEventListener("click", () => {
  const value = searchInput.value;
  fetchWeatherUsingCity(value);
});

// fetching data using city name
async function fetchWeatherUsingCity(city) {
  loader.style.display = "block";
  try {
    weatherInfoArea.style.display = "none";
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = await res.json();
    console.log("Weather Data using city name \n", data);
    renderData(data);
  } catch (e) {
    console.log("Error Fetching Data!!", e);
  } finally {
    loader.style.display = "none";
    weatherInfoArea.style.display = "flex";
  }
}

// rendering data on the document
function renderData(data) {
  city.textContent = `${data?.name}`;
  condition.textContent = `${data?.weather[0]?.main}`;
  temperature.textContent = `${data?.main?.temp}°C`;
  humidity.textContent = `${data?.main?.humidity}%`;
  wind.textContent = `${data?.wind?.speed} m/s`;
  cloud.textContent = `${data?.clouds?.all}%`;
}

// fetching data using Geolocation
async function fetchWeatherUsingGeolocation(lat,lon) {
  loader.style.display = "block";
  try {
    weatherInfoArea.style.display = "none";
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );
    const data = await res.json();
    console.log("Weather Data using geolocation \n", data);
    renderData(data);
  } catch (e) {
    console.log("Error Fetching Data!!", e);
  } finally {
    loader.style.display = "none";
    weatherInfoArea.style.display = "flex";
  }
}

//getting geo location
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  lon = position.coords.longitude;
  lat = position.coords.latitude;
}

