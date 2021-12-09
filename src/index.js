let now = new Date();
const apiKey = "69783318a51bc25d3112e1ead9cef0cd";
const altTextObject = {
  "01d": "Yellow sun",
  "01n": "Purple crescent moon surrounded by yellow stars",
  "02d": "Yellow sun behind white cloud",
  "02n": "Purple crescent moon behind white cloud",
  "03d": "White cloud",
  "03n": "White cloud surrounded by fuchsia stars",
  "04d": "Two white clouds overlapping each other",
  "04n": "Two white clouds overlapping each other, surrounded by fuchsia stars",
  "09d": "White cloud with three raindrops falling from it",
  "09n": "White cloud with three raindrops falling from it",
  "10d": "Yellow sun behind white cloud with three raindrops falling from it",
  "10n":
    "Purple crescent moon behind white cloud with three raindrops falling from it",
  "11d": "Yellow sun behind white cloud with lightning bolt",
  "11n":
    "Purple crescent moon behind white cloud with lightning bolt surrounded by yellow stars",
  "13d": "White cloud with snowflakes",
  "13n": "Purple crescent moon behind white cloud with snowflakes",
  "50d": "Yellow sun with white squiggly mist lines",
  "50n": "Purple crescent moon with white squiggly mist lines",
};

/**
 *
 * @param {*} imageName
 */
function changeBackground(imageName) {
  if (isMobile()) {
    imageName = imageName.concat("-mobile");
  }

  document.querySelector(
    "body"
  ).style.backgroundImage = `url(backgrounds/${imageName}.png)`;
  document.body.style.backgroundHeight = "90%";
}

/**
 *
 * @returns true if screen size is less than 700px, false otherwise
 */
function isMobile() {
  if (window.screen.width < 700) {
    return true;
  }
  return false;
}

/**
 *
 * @param {*} hexCode
 */
function changeTextColor(hexCode) {
  // Date/time, Change location input/buttons
  document.getElementById("upper-container").style.color = hexCode;

  document.querySelector("input").style.borderColor = hexCode;
  document.querySelector("input").style.color = hexCode;

  if (hexCode == "#fff") {
    document.querySelector("#search-city").classList.add("night");
  } else {
    document.querySelector("#search-city").classList.remove("night");
  }

  // Current Location
  document.getElementById("location").style.color = hexCode;

  // Next 5 days
  document.querySelector(".card-title").style.color = hexCode;

  // hr tag and footer
  document.querySelector("hr").style.color = hexCode;
  document.querySelector("hr").style.borderTopColor = hexCode;
  document.getElementById("footer").style.color = hexCode;
}

/**
 *
 * @param {*} date
 */
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

/**
 *
 * @param {*} date
 * @returns
 */
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

/**
 *
 * @param {*} now
 */
function displayCurrentTime(now) {
  formattedTime = formatTime(now);
  let timeElement = document.getElementById("time");
  timeElement.innerHTML = formattedTime;
}

/**
 *
 * @param {*} response
 */
function displayCurrentWeather(response) {
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

  // Weather Description
  let currWeatherElement = document.getElementById("weather-condition");
  let weather = response.data.weather[0].main;
  //let weather = response.data.weather[0].description;
  currWeatherElement.innerHTML = weather;

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

  sunriseFormattedTime = formatTime(sunrise);
  sunsetFormattedTime = formatTime(sunset);

  sunriseElement.innerHTML = sunriseFormattedTime;
  sunsetElement.innerHTML = sunsetFormattedTime;

  let iconId = response.data.weather[0].icon;
  displayIcon("current-weather-icon", iconId);

  // CHANGE BACKGROUND HERE
  let currentDate = new Date();
  let currentTime = currentDate.getTime();
  let sunriseTime = sunrise.getTime();
  let sunsetTime = sunset.getTime();

  let halfHour = (3600 / 2) * 1000;

  if (
    currentTime > sunriseTime + halfHour &&
    currentTime < sunsetTime - halfHour
  ) {
    if (response.data.weather[0].id == 800) {
      changeBackground("clear-sky");
    } else {
      changeBackground("cloudy-sky");
    }
    changeTextColor("#000");
  } else if (
    currentTime < sunriseTime - halfHour ||
    currentTime > sunsetTime + halfHour
  ) {
    // use night sky image
    changeBackground("night");
    changeTextColor("#fff");
  } else if (
    currentTime < sunsetTime + halfHour ||
    currentTime > sunsetTime - halfHour
  ) {
    changeBackground("sunset");
    changeTextColor("#000");
  } else {
    changeBackground("sunrise");
    changeTextColor("#fff");
  }
}

/**
 *
 */
function defaultData() {
  let city = "Montreal";
  fetchAndDisplayForecastByCity(city);
}

/**
 *
 * @param {*} response
 */
function displayNext5DaysWeather(response) {
  let day1 = response.data.daily[1];
  let day2 = response.data.daily[2];
  let day3 = response.data.daily[3];
  let day4 = response.data.daily[4];
  let day5 = response.data.daily[5];

  displayDay(1, day1.dt);
  displayDay(2, day2.dt);
  displayDay(3, day3.dt);
  displayDay(4, day4.dt);
  displayDay(5, day5.dt);

  // daily.temp.day
  let day1Temp = day1.temp.day;
  let day2Temp = day2.temp.day;
  let day3Temp = day3.temp.day;
  let day4Temp = day4.temp.day;
  let day5Temp = day5.temp.day;

  // daily.feels_like.day
  let day1FeelsLike = day1.feels_like.day;
  let day2FeelsLike = day2.feels_like.day;
  let day3FeelsLike = day3.feels_like.day;
  let day4FeelsLike = day4.feels_like.day;
  let day5FeelsLike = day5.feels_like.day;

  // daily.pop
  let day1PoP = day1.pop;
  let day2PoP = day2.pop;
  let day3PoP = day3.pop;
  let day4PoP = day4.pop;
  let day5PoP = day5.pop;

  let day1TempElement = document.getElementById("temp1");
  let day2TempElement = document.getElementById("temp2");
  let day3TempElement = document.getElementById("temp3");
  let day4TempElement = document.getElementById("temp4");
  let day5TempElement = document.getElementById("temp5");

  day1TempElement.innerHTML = Math.round(day1Temp);
  day2TempElement.innerHTML = Math.round(day2Temp);
  day3TempElement.innerHTML = Math.round(day3Temp);
  day4TempElement.innerHTML = Math.round(day4Temp);
  day5TempElement.innerHTML = Math.round(day5Temp);

  // daily.weather.icon
  let day1IconId = day1.weather[0].icon;
  let day2IconId = day2.weather[0].icon;
  let day3IconId = day3.weather[0].icon;
  let day4IconId = day4.weather[0].icon;
  let day5IconId = day5.weather[0].icon;

  displayIcon("img1", day1IconId);
  displayIcon("img2", day2IconId);
  displayIcon("img3", day3IconId);
  displayIcon("img4", day4IconId);
  displayIcon("img5", day5IconId);

  let day1FeelsLikeElement = document.getElementById("feels-like1");
  let day2FeelsLikeElement = document.getElementById("feels-like2");
  let day3FeelsLikeElement = document.getElementById("feels-like3");
  let day4FeelsLikeElement = document.getElementById("feels-like4");
  let day5FeelsLikeElement = document.getElementById("feels-like5");

  day1FeelsLikeElement.innerHTML = "Feels " + Math.round(day1FeelsLike);
  day2FeelsLikeElement.innerHTML = "Feels " + Math.round(day2FeelsLike);
  day3FeelsLikeElement.innerHTML = "Feels " + Math.round(day3FeelsLike);
  day4FeelsLikeElement.innerHTML = "Feels " + Math.round(day4FeelsLike);
  day5FeelsLikeElement.innerHTML = "Feels " + Math.round(day5FeelsLike);

  let day1PoPElement = document.getElementById("pop1");
  let day2PoPElement = document.getElementById("pop2");
  let day3PoPElement = document.getElementById("pop3");
  let day4PoPElement = document.getElementById("pop4");
  let day5PoPElement = document.getElementById("pop5");

  day1PoPElement.innerHTML = Math.round(day1PoP * 100);
  day2PoPElement.innerHTML = Math.round(day2PoP * 100);
  day3PoPElement.innerHTML = Math.round(day3PoP * 100);
  day4PoPElement.innerHTML = Math.round(day4PoP * 100);
  day5PoPElement.innerHTML = Math.round(day5PoP * 100);
}

/**
 *
 */
function useCurrentLocation() {
  navigator.geolocation.getCurrentPosition(fetchAndDisplayForecastByPosition);
}

/**
 *
 * @param {*} e
 */
function catchFunction(e) {
  console.error("myError", e);

  if (e.message == "Request failed with status code 404") {
    alert(
      "The city name you entered does not exist. Please check for typos or enter another city name."
    );
  } else {
    alert("An error occurred: " + e.message);
  }
}

/**
 * Uses latitude and longitude to call APIs
 *
 * @param {*} position
 * @returns
 */
function fetchForecast(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  let urlNext5Days = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,alerts,current&appid=${apiKey}&units=metric`;

  return Promise.all([axios.get(url), axios.get(urlNext5Days)]);
}

/**
 *
 * @param {*} param0
 */
function displayForecast([currentWeatherResponse, next5DaysWeatherResponse]) {
  displayCurrentWeather(currentWeatherResponse);
  displayNext5DaysWeather(next5DaysWeatherResponse);
}

/**
 *
 * @param {*} position
 */
function fetchAndDisplayForecastByPosition(position) {
  fetchForecast(position).then(displayForecast).catch(catchFunction);
}

/**
 *
 * @param {*} city
 */
function fetchAndDisplayForecastByCity(city) {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then((response) => {
    return fetchAndDisplayForecastByPosition({
      coords: {
        longitude: response.data.coord.lon,
        latitude: response.data.coord.lat,
      },
    });
  }, catchFunction);
}

/**
 * This function is called when searching a city
 * If user submits form without entering a city, an alert will indicate so
 *
 * @param {*} event
 */
function search(event) {
  // event.preventDefault();
  let userInput = document.querySelector("#search-city");
  let input = userInput.value.toLowerCase();

  if (input !== "") {
    let city = input;
    fetchAndDisplayForecastByCity(city);
  } else {
    alert(`You must enter a city name before clicking "Search".`);
  }
}

/**
 * This function displays the appropriate weather icon and updates its alt text
 *
 * @param {*} imgId id of the html img
 * @param {*} iconId id of the desired weather icon
 */
function displayIcon(imgId, iconId) {
  let imgElement = document.getElementById(imgId);
  imgElement.src = `weather_icons/${iconId}.png`;
  imgElement.alt = altTextObject[iconId];
}

/**
 * This function formats and displays a date in the Next 5 Days card
 *
 * Example (Monday December 6):
 * MON
 * 12/06
 *
 * @param {*} index 1, 2, 3, 4, or 5
 * @param {*} dt epoch date/time from api call
 */
function displayDay(index, dt) {
  let weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  let fullDate = new Date(dt * 1000);
  let day = fullDate.getDay(); // day of the week
  let month = fullDate.getMonth() + 1; // month
  let date = fullDate.getDate(); // ex: the 5th day of the month

  let weekdayElement = document.getElementById(`weekday${index}`);
  weekdayElement.innerHTML = weekdays[day];

  if (month < 10) {
    month = "0" + month;
  }

  if (date < 10) {
    date = "0" + date;
  }

  let dateElement = document.getElementById(`date${index}`);
  dateElement.innerHTML = month + "/" + date;
}

displayCurrentDate(now);
displayCurrentTime(now);
defaultData();

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", search);

function searchCitySubmit(evt) {
  evt.preventDefault();
  search();
}

window.addEventListener("load", () => {
  document.querySelector("form").addEventListener("submit", searchCitySubmit);
});
