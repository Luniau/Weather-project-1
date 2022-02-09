function searchCity(event) {
  event.preventDefault();
  let search = document.querySelector("#search-text");

  let location = document.querySelector("#location");
  if (search.value) {
    location.innerHTML = `${search.value}`;
    let apiKey = "704c1ac4921f1b0774eeea454560dd2f";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${search.value}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(displayTemperature);
  } else {
    location.innerHTML = null;
    alert("Please type a city");
  }
}
let form = document.querySelector("#search-form");

form.addEventListener("submit", searchCity);

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

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
  return `${day}, ${hours}: ${minutes}`;
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let locationElement = document.querySelector("#location");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let feelsLikeElement = document.querySelector("#feels-like");
  let dateElement = document.querySelector(".dayTimeWeek");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  locationElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  feelsLikeElement.innerHTML = Math.round(response.data.main.feels_like);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
}

let apiKey = "704c1ac4921f1b0774eeea454560dd2f";
let city = "Amsterdam";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let location = document.querySelector("h2");
  location.innerHTML = `Current temperature is ${temperature}°C in Amstelveen`;
}

function retrievePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "704c1ac4921f1b0774eeea454560dd2f";
  let apiUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}
navigator.geolocation.getCurrentPosition(retrievePosition);
