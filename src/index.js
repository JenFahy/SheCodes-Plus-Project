function formatDate(date) {
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

let now = new Date();
let time = document.querySelector(".time");
time.innerHTML = formatDate(now);

///

function displayTemperature(response) {
  let currentTemperature = Math.round(response.data.main.temp);
  let result = document.querySelector(".result");
  let searchInput = document.querySelector("#search-text-input");
  if (searchInput.value) {
    result.innerHTML = `${currentTemperature}°C in ${searchInput.value}`;
  } else {
    result.innerHTML = null;
  }
}
function getTemperature(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  let apiKey = "a9b5855c79e144e350a1b05b4bd066a7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(displayTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", getTemperature);

///

function fetchTemperature(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "a9b5855c79e144e350a1b05b4bd066a7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  function showLocalTemperature(response) {
    let currentTemperature = Math.round(response.data.main.temp);
    let localTemperature = document.querySelector("#local-temperature");
    localTemperature.innerHTML = `${currentTemperature}`;
    let location = response.data.name;
    let currentLocation = document.querySelector("#current-location");
    currentLocation.innerHTML = `${location}`;
  }

  axios.get(`${apiUrl}`).then(showLocalTemperature);
}

function fetchLocation(event) {
  navigator.geolocation.getCurrentPosition(fetchTemperature);
}

let button = document.querySelector("#current-location");
button.addEventListener("click", fetchLocation);
///

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#local-temperature");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#local-temperature");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round(((temperature - 32) * 5) / 9);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);
