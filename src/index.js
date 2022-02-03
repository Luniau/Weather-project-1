function displayDay() {
  let today = new Date();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[today.getDay()];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[today.getMonth()];
  let hours = today.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = today.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let displayDay = document.querySelector(".dayTimeWeek");
  displayDay.innerHTML = `${day}, ${month} ${hours}: ${minutes}`;
}
displayDay();



function searchCity(event) {
  event.preventDefault();
  let search = document.querySelector("#search-text");

  let location = document.querySelector("#location");
  if (search.value) {
    location.innerHTML = `${search.value}`;
    let apiKey = "704c1ac4921f1b0774eeea454560dd2f";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${search.value}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(returnLocation);
  } else {
    location.innerHTML = null;
    alert("Please type a city");
  }
}
let form = document.querySelector("#search-form");

form.addEventListener("submit", searchCity);


function returnLocation(response) {
  let temperature = Math.round(response.data.main.temp);
  let location = response.data.name;
  let cityElement = document.querySelector("#location");
  cityElement.innerHTML = `${location}`;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${temperature}°C`;
  let wind = Math.round(response.data.wind.speed);
  let windElement = document.querySelector(".wind");
  windElement.innerHTML = `Wind: ${wind}mph`;

  let feelsLike = Math.round(response.data.main.feels_like);
  let feelsLikeElement = document.querySelector(".feels-like");
  feelsLikeElement.innerHTML = `Feels like: ${feelsLike}°`;

  let humidity = Math.round(response.data.main.humidity);
  let humidityElement = document.querySelector(".humidity");
  humidityElement.innerHTML = `Humidity: ${humidity}%`;

}

function showTemperature(response) {
  let temperature = Math.round (response.data.main.temp);
  let location = document.querySelector("h2");
  location.innerHTML =`Current temperature is ${temperature}°C in Amstelveen`;
}

function retrievePosition(position) {
 let latitude = position.coords.latitude;
 let longitude = position.coords.longitude;
 let units= "metric"
 let apiKey = "704c1ac4921f1b0774eeea454560dd2f";
 let apiUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

 axios.get (apiUrl).then(showTemperature);


}
 navigator.geolocation.getCurrentPosition(retrievePosition);

  
