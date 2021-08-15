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
  let currTempElement = document.querySelector(".currentTemperature");
  let temperature = Math.round(response.data.main.temp);

  let currCity = response.data.name;
  let cityElement = document.querySelector(".city");
  cityElement.innerHTML = currCity;

  console.log(response.data);

  currTempElement.innerHTML = `${temperature}°C`;
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