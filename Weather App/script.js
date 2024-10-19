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
const error404 = document.querySelector(".error");
const grantAccessBtn = document.querySelector("[data-grant-access-btn]");
const weatherIcon = document.querySelector("[data-weather-icon]");

grantAccessBtn.addEventListener('click', () => {
  if (!checkLocation()) {
    getLocation();
  } else {
    console.log('Location data already stored.');
  }
});
checkLocation();
function checkLocation() {
  let storedData = sessionStorage.getItem('cords');
  
  if (storedData) {
    let coordinates = JSON.parse(storedData);
    grantLocationArea.style.display = "none";
    fetchWeatherUsingGeolocation(coordinates.x, coordinates.y);
    return true;
  } else {
    grantLocationArea.style.display="flex";
    weatherInfoArea.style.display="none";
    return false;
  }
}


// tab switching
searchLocationBtn.addEventListener("click", () => {
  searchLocationBtn.classList.add("button-active");
  yourLocationBtn.classList.remove("button-active");
  weatherInfoArea.style.display = "none";
  grantLocationArea.style.display = "none";
  searchArea.style.display = "flex";
});
yourLocationBtn.addEventListener("click", () => {
  yourLocationBtn.classList.add("button-active");
  searchLocationBtn.classList.remove("button-active");
  searchArea.style.display = "none";
  checkLocation();
});

// search weather using city name
searchBtn.addEventListener("click", () => {
  const value = searchInput.value;
  if(value.trim()!==""){
    fetchWeatherUsingCity(value);
  }
  searchInput.value="";
});
searchInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    searchBtn.click();
  }
});

async function fetchWeather(url) {
  loader.style.display = "block";
  weatherInfoArea.style.display = "none";
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data?.cod === "404") {
      cityNotFound();
    } else {
      error404.style.display = "none";
      renderData(data);
      weatherInfoArea.style.display = "flex";
    }
  } catch (e) {
    console.error("Error Fetching Data:", e);
  } finally {
    loader.style.display = "none";
  }
}


async function fetchWeatherUsingCity(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  await fetchWeather(url);
}

async function fetchWeatherUsingGeolocation(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  await fetchWeather(url);
}


// rendering data on the document
function renderData(data) {
  city.innerHTML = `${data?.name} <img
    src="https://flagcdn.com/144x108/${data?.sys?.country.toLowerCase()}.png"
      width="40"
        height="30"
          alt="${data?.name}">`;
  condition.textContent = `${data?.weather[0]?.main}`;
  temperature.textContent = `${data?.main?.temp}°C`;
  humidity.textContent = `${data?.main?.humidity}%`;
  wind.textContent = `${data?.wind?.speed} m/s`;
  cloud.textContent = `${data?.clouds?.all}%`;
  weatherIcon.src = `https://openweathermap.org/img/wn/${data?.weather?.[0]?.icon}@2x.png`
}

//getting geo location
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const coords = {
        x: position.coords.latitude,
        y: position.coords.longitude
      };
      sessionStorage.setItem('cords', JSON.stringify(coords));
      grantLocationArea.style.display = "none";
      fetchWeatherUsingGeolocation(coords.x, coords.y);
    }, (error) => {
      console.error('Error getting location:', error);
    });
  } else {
    console.error('Geolocation is not supported by this browser.');
  }
}


function cityNotFound() {
  weatherInfoArea.style.display="none";
  error404.style.display = "flex";
}