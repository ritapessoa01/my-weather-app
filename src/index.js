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

  getForecast(response.data.city);
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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "43465c40f4c5d3a735b5b8tbed06aoae";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
      <div class="forecast-day-one">
       <div class="forecast-date"><strong>${formatDay(day.time)}</strong></div>
        <img src="${day.condition.icon_url}" class="forecast-icon" />
       <div class="forecast-temperatures">
        <div class="forecast-highest-temperature"><strong>${Math.round(
          day.temperature.maximum
        )}° </strong></div>
        <div class="forecast-lowest-temperature"> / ${Math.round(
          day.temperature.minimum
        )}°</div>
       </div>
      </div>
      `;
    }
  });

  let forecast = document.querySelector("#forecast");
  forecast.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", citySearch);

updateInfo("Lisbon");
