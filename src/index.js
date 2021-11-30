let now = new Date();
let apiKey = "69783318a51bc25d3112e1ead9cef0cd";

window.onload = function () {
  defaultData();
};

function displayCurrentDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
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
    "December",
  ];

  let currentDay = days[date.getDay()];
  let currentMonth = months[date.getMonth()];
  let currentDate = date.getDate();

  let formattedDate = `${currentDay}, ${currentMonth} ${currentDate}`;

  let dateElement = document.getElementById("date");
  dateElement.innerHTML = formattedDate;
}

function formatTime(date) {
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let period = "AM";

  if (hour == 0) {
    hour = 12;
  }

  if (hour > 12) {
    hour = hour - 12;
    period = "PM";
  }

  if (hour < 10) {
    hour = "0" + hour;
  }

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  return `${hour}:${minutes} ${period}`;
}

function displayCurrentTime(now) {
  formattedTime = formatTime(now);
  let timeElement = document.getElementById("time");
  timeElement.innerHTML = formattedTime;
}

displayCurrentDate(now);
displayCurrentTime(now);
// defaultData();

function search(event) {
  event.preventDefault();
  let input = document.querySelector("#search-city");
  let userInput = input.value.toLowerCase();

  let city = userInput;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(url).then(getWeather);
}

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", search);

function getWeather(response) {
  // City
  let cityElement = document.getElementById("city");
  let city = response.data.name;
  cityElement.innerHTML = city;

  // Country
  let countryElement = document.getElementById("country");
  let country = response.data.sys.country;
  countryElement.innerHTML = country;

  // Current Temperature
  let currentTempElement = document.getElementById("temperature");
  let currentTemp = Math.round(response.data.main.temp);
  currentTempElement.innerHTML = `${currentTemp}`;

  // Weather
  let currWeatherElement = document.getElementById("weather-condition");
  let weather = response.data.weather[0].main;
  currWeatherElement.innerHTML = weather;

  // console.log(response.data);

  // Feels like Temperature
  let feelsLikeTempElement = document.getElementById("card1-feels-like-temp");
  let feelsLikeTemp = Math.round(response.data.main.feels_like);
  feelsLikeTempElement.innerHTML = feelsLikeTemp;

  let humidityElement = document.getElementById("humidity");
  let pressureElement = document.getElementById("pressure");
  let tempMaxElement = document.getElementById("temp-max");
  let tempMinElement = document.getElementById("temp-min");
  let windSpeedElement = document.getElementById("wind-speed");

  let humidity = response.data.main.humidity;
  let pressure = response.data.main.pressure;
  let tempMax = Math.round(response.data.main.temp_max);
  let tempMin = Math.round(response.data.main.temp_min);
  let windSpeed = response.data.wind.speed;

  humidityElement.innerHTML = humidity;
  pressureElement.innerHTML = pressure;
  tempMaxElement.innerHTML = tempMax;
  tempMinElement.innerHTML = tempMin;
  windSpeedElement.innerHTML = windSpeed; // default is metric: m/s, imperial: miles/s

  let sunriseElement = document.getElementById("sunrise");
  let sunsetElement = document.getElementById("sunset");

  let sunrise = response.data.sys.sunrise * 1000;
  let sunset = response.data.sys.sunset * 1000;

  sunrise = new Date(sunrise);
  sunset = new Date(sunset);

  // console.log("Sunrise: " + sunrise.getTime());
  //console.log(sunset);

  sunriseFormattedTime = formatTime(sunrise);
  sunsetFormattedTime = formatTime(sunset);

  sunriseElement.innerHTML = sunriseFormattedTime;
  sunsetElement.innerHTML = sunsetFormattedTime;

  // console.log(sunrise);

  let iconId = response.data.weather[0].icon;
  let imgElement = document.querySelector(".weather-icon");
  imgElement.src = `weather_icons/${iconId}.png`;
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
