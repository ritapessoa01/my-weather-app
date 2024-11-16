function refreshWeather(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);

  let cityElement = document.querySelector("#weather-app-city");
  cityElement.innerHTML = response.data.city;

  let countryElement = document.querySelector("#weather-app-country");
  countryElement.innerHTML = response.data.country;
}

function updateInfo(city) {
  let apiKey = "43465c40f4c5d3a735b5b8tbed06aoae";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function citySearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  updateInfo(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", citySearch);
