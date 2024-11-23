function refreshWeather(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);

  let cityElement = document.querySelector("#weather-app-city");
  cityElement.innerHTML = response.data.city;

  let countryElement = document.querySelector("#weather-app-country");
  countryElement.innerHTML = response.data.country;

  let humidity = document.querySelector("#current-humidity");
  humidity.innerHTML = response.data.temperature.humidity;

  let windSpeed = document.querySelector("#current-wind");
  windSpeed.innerHTML = response.data.wind.speed;

  let currentDescription = document.querySelector("#current-description");
  currentDescription.innerHTML = response.data.condition.description;

  let date = new Date(response.data.time * 1000);

  let currentTime = document.querySelector("#time");
  currentTime.innerHTML = formatDate(date);

  let icon = document.querySelector("#current-emoji");
  icon.innerHTML = `<img src="${response.data.condition.icon_url}" class="current-emoji" id="current-emoji"/>`;

  console.log(response.data);
}

function formatDate(date) {
  let hour = date.getHours();
  let minutes = date.getMinutes();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day}, ${hour}:${minutes}`;
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

function displayForecast() {
  let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
      <div class="forecast-day-one">
       <div class="forecast-date"><strong>${day}</strong></div>
       <div class="forecast-icon">☀️</div>
       <div class="forecast-temperatures">
        <div class="forecast-highest-temperature"><strong>22° </strong></div>
        <div class="forecast-lowest-temperature"> / 15°</div>
       </div>
      </div>
      `;
  });

  let forecast = document.querySelector("#forecast");
  forecast.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", citySearch);

updateInfo("Lisbon");
displayForecast();
