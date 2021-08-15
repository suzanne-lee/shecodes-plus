let now = new Date();
let apiKey = "69783318a51bc25d3112e1ead9cef0cd";

window.onload = function () {
  defaultData();
};

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  let currentDay = days[date.getDay()];
  let currentMonth = months[date.getMonth()];
  let currentDate = date.getDate();

  let formattedDate = `${currentDay}, ${currentMonth} ${currentDate}`;

  let dateElement = document.querySelector(".date");
  dateElement.innerHTML = formattedDate;
}

function formatTime(date) {
  let currentHour = date.getHours();
  let currentMinutes = date.getMinutes();
  let period = "AM";

  // 12 hour clock
  if (currentHour > 12) {
    currentHour = currentHour - 12;
    period = "PM";
  }

  if (currentHour < 10) {
    currentHour = "0" + currentHour;
  }

  if (currentMinutes < 10) {
    currentMinutes = "0" + currentMinutes;
  }

  let formattedTime = `${currentHour}:${currentMinutes} ${period}`;

  let timeElement = document.querySelector(".time");
  timeElement.innerHTML = formattedTime;
}

function search(event) {
  event.preventDefault();
  let input = document.querySelector("#search");
  let userInput = input.value.toLowerCase();

  let city = userInput;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(url).then(getWeather);
}

formatDate(now);
formatTime(now);

let form = document.querySelector("form");
form.addEventListener("submit", search);

function getWeather(response) {
  // City
  let cityElement = document.querySelector(".city");
  let currentCity = response.data.name;
  cityElement.innerHTML = currentCity;

  // Country
  let country = response.data.sys.country;
  // cityElement.innerHTML += country;

  // Current Temperature
  let currentTempElement = document.querySelector(".currentTemperature");
  let currentTemp = Math.round(response.data.main.temp);
  currentTempElement.innerHTML = `${currentTemp}°C`;

  // Feels like Temperature
  let feelsLikeTempElement = document.querySelector(".feelsLikeTemperature");
  let feelsLikeTemp = Math.round(response.data.main.feels_like);
  feelsLikeTempElement.innerHTML = `Feels like ${feelsLikeTemp}°C`;

  // Weather
  let currWeatherElement = document.querySelector(".weather");
  let weather = response.data.weather[0].main;
  currWeatherElement.innerHTML = `${weather}`;
}

function useCurrentLocation() {
  navigator.geolocation.getCurrentPosition(getPosition);
}

function getPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;

  axios.get(url).then(getWeather);
}

function defaultData() {
  let city = "Montreal";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(url).then(getWeather);
}

window.useCurrentLocation = useCurrentLocation;
