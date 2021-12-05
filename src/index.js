let now = new Date();
// let apiKey = "69783318a51bc25d3112e1ead9cef0cd";
let apiKey = "69783318a51bc25d3112e1ead9cef0cd";

// altTextObject[iconId];
const altTextObject = {
  "01d": "Yellow Sun",
  "01n": "Purple Crescent Moon surrounded by Yellow Stars",
  "02d": "Yellow Sun Behind White Cloud",
  "02n": "Purple Crescent Moon Behind White Cloud",
  "03d": "White Cloud",
  "03n": "White Cloud surrounded by Fuchsia Stars",
  "04d": "Two White Clouds overlapping each other",
  "04n": "Two White Clouds overlapping each other, surrounded by Fuchsia Stars",
  "09d": "White Cloud with 3 Raindrops",
  "09n": "White Cloud with 3 Raindrops",
  "10d": "Yellow Sun Behind White Cloud with 3 Raindrops",
  "10n": "Purple Crescent Moon Behind White Cloud with 3 Raindrops",
  "11d": "Yellow Sun Behind White Cloud with Lightning Bolt",
  "11n":
    "Purple Crescent Moon Behind White Cloud with Lightning Bolt surrounded by Yellow Stars",
  "13d": "White Cloud with Snowflakes",
  "13n": "Purple Crescent Moon Behind White Cloud with Snowflakes",
  "50d": "Yellow Sun with White Squiggly Mist Lines",
  "50n": "Purple Crescent Moon with White Squiggly Mist Lines",
};

// day-cloudy-sky-background: between sunrise and sunset, cloudy
// day-clear-sky-background: between sunrise and sunset, clear sky
// morning-evening-sky-background: sunrise/sunset
// night-sky-background: night

function changeBackground(imageName) {
  document.querySelector(
    "body"
  ).style.backgroundImage = `url(backgrounds/${imageName}.png)`;
  // element.style.backgroundColor = color;
  document.body.style.backgroundHeight = "90%";
}

function changeTextColor(hexCode) {
  document.getElementById("upper-container").style.color = hexCode;

  document.querySelector("input").style.borderColor = hexCode;
  document.querySelector("input").style.color = hexCode;

  // location
  document.getElementById("location").style.color = hexCode;

  // Next 5 days
  document.querySelector(".card-title").style.color = hexCode;

  // hr tag and footer
  document.querySelector("hr").style.color = hexCode;
  document.querySelector("hr").style.borderTopColor = hexCode;
  document.getElementById("footer").style.color = hexCode;
}

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
defaultData();

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
  //let imgElement = document.getElementById("current-weather-icon");
  // imgElement.src = `weather_icons/${iconId}.png`;

  displayIcon("current-weather-icon", iconId);

  // setAltText(imgId, iconId)
  // setAltText("current-weather-icon", iconId);

  // CHANGE BACKGROUND HERE
  let currentDate = new Date();
  let currentTime = currentDate.getTime();
  let sunriseTime = sunrise.getTime();
  let sunsetTime = sunset.getTime();

  let halfHour = (3600 / 2) * 1000;

  //console.log("Current Time: " + currentTime);
  //console.log("Sunrise Time: " + sunriseTime);
  //console.log("Sunset Time: " + sunsetTime);

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
    // changeBackground("sunset-sunrise");
    changeTextColor("#fff");
  } else {
    // use sunrise/sunset image
    changeBackground("sunrise-sunset");
    changeTextColor("#fff");
  }
}

function defaultData() {
  let city = "Montreal";
  blah2(city);
}

function getLatLongCoord(response) {
  //console.log(response.data.coord.lat);
  //console.log(response.data.coord.lon);
  return response.data.coord.lat;
}

function displayNext5DaysWeather(response) {
  displayNext5Days(now);
  //console.log("displayNext5DaysWeather", response);

  let day1 = response.data.daily[1];
  let day2 = response.data.daily[2];
  let day3 = response.data.daily[3];
  let day4 = response.data.daily[4];
  let day5 = response.data.daily[5];

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

  //let day1IconElement = document.getElementById("img1");
  //let day2IconElement = document.getElementById("img2");
  //let day3IconElement = document.getElementById("img3");
  //let day4IconElement = document.getElementById("img4");
  //let day5IconElement = document.getElementById("img5");

  //day1IconElement.src = `weather_icons/${day1IconID}.png`;
  //day2IconElement.src = `weather_icons/${day2IconID}.png`;
  //day3IconElement.src = `weather_icons/${day3IconID}.png`;
  //day4IconElement.src = `weather_icons/${day4IconID}.png`;
  //day5IconElement.src = `weather_icons/${day5IconID}.png`;

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

  // TO DO: can use response.data.daily.dt to get that day's date/time
  // TO DO: figure out alt text situation
}

function displayNext5Days(now) {
  let weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  // use this to test
  // now = new Date(now.getTime() + 75 * (24 * 60 * 60 * 1000));

  /*
  let weekday1 = weekdays[(date.getDay() + 1) % 7];
  let weekday2 = weekdays[(date.getDay() + 2) % 7];
  let weekday3 = weekdays[(date.getDay() + 3) % 7];
  let weekday4 = weekdays[(date.getDay() + 4) % 7];
  let weekday5 = weekdays[(date.getDay() + 5) % 7];

  let weekday1Element = document.getElementById("weekday1");
  let weekday2Element = document.getElementById("weekday2");
  let weekday3Element = document.getElementById("weekday3");
  let weekday4Element = document.getElementById("weekday4");
  let weekday5Element = document.getElementById("weekday5");

  weekday1Element.innerHTML = weekday1;
  weekday2Element.innerHTML = weekday2;
  weekday3Element.innerHTML = weekday3;
  weekday4Element.innerHTML = weekday4;
  weekday5Element.innerHTML = weekday5;*/

  const oneDay = 24 * 60 * 60 * 1000;
  let day1 = new Date(now.getTime() + oneDay);
  let day2 = new Date(now.getTime() + 2 * oneDay);
  let day3 = new Date(now.getTime() + 3 * oneDay);
  let day4 = new Date(now.getTime() + 4 * oneDay);
  let day5 = new Date(now.getTime() + 5 * oneDay);

  let weekday1Element = document.getElementById("weekday1");
  let weekday2Element = document.getElementById("weekday2");
  let weekday3Element = document.getElementById("weekday3");
  let weekday4Element = document.getElementById("weekday4");
  let weekday5Element = document.getElementById("weekday5");

  weekday1Element.innerHTML = weekdays[day1.getDay()];
  weekday2Element.innerHTML = weekdays[day2.getDay()];
  weekday3Element.innerHTML = weekdays[day3.getDay()];
  weekday4Element.innerHTML = weekdays[day4.getDay()];
  weekday5Element.innerHTML = weekdays[day5.getDay()];

  let date1Element = document.getElementById("date1");
  let date2Element = document.getElementById("date2");
  let date3Element = document.getElementById("date3");
  let date4Element = document.getElementById("date4");
  let date5Element = document.getElementById("date5");

  let month1 = day1.getMonth() + 1;
  let month2 = day2.getMonth() + 1;
  let month3 = day3.getMonth() + 1;
  let month4 = day4.getMonth() + 1;
  let month5 = day5.getMonth() + 1;

  if (month1 < 10) {
    month1 = "0" + month1;
  }
  if (month2 < 10) {
    month2 = "0" + month2;
  }
  if (month3 < 10) {
    month3 = "0" + month3;
  }
  if (month4 < 10) {
    month4 = "0" + month4;
  }
  if (month5 < 10) {
    month5 = "0" + month5;
  }

  let date1 = day1.getDate().toString();
  let date2 = day2.getDate().toString();
  let date3 = day3.getDate().toString();
  let date4 = day4.getDate().toString();
  let date5 = day5.getDate().toString();

  if (date1 < 10) {
    date1 = "0" + date1;
  }
  if (date2 < 10) {
    date2 = "0" + date2;
  }
  if (date3 < 10) {
    date3 = "0" + date3;
  }
  if (date4 < 10) {
    date4 = "0" + date4;
  }
  if (date5 < 10) {
    date5 = "0" + date5;
  }

  date1Element.innerHTML = month1 + "/" + date1;
  date2Element.innerHTML = month2 + "/" + date2;
  date3Element.innerHTML = month3 + "/" + date3;
  date4Element.innerHTML = month4 + "/" + date4;
  date5Element.innerHTML = month5 + "/" + date5;
}

function useCurrentLocation() {
  navigator.geolocation.getCurrentPosition(displayCurrentLocation);
}

function catchFunction(e) {
  console.error("myError", e);
  //console.log(e.message);

  if (e.message == "Request failed with status code 404") {
    alert(
      "The city name you entered does not exist. Please check for typos or enter another city name."
    );
  } else {
    alert("An error occurred: " + e.message);
  }

  // The city name "userInput" does not exist. Please check for typos or enter another city name.
}

function blah(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  let urlNext5Days = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,alerts,current&appid=${apiKey}&units=metric`;

  return Promise.all([axios.get(url), axios.get(urlNext5Days)]);
}

function displayCurrentAndNext5DaysWeather([
  currentWeatherResponse,
  next5DaysWeatherResponse,
]) {
  displayCurrentWeather(currentWeatherResponse);
  displayNext5DaysWeather(next5DaysWeatherResponse);
}

function displayCurrentLocation(position) {
  blah(position).then(displayCurrentAndNext5DaysWeather).catch(catchFunction);
}

function blah2(city) {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then((response) => {
    return displayCurrentLocation({
      coords: {
        longitude: response.data.coord.lon,
        latitude: response.data.coord.lat,
      },
    });
  }, catchFunction);
}

function search(event) {
  // event.preventDefault();
  let userInput = document.querySelector("#search-city");
  let input = userInput.value.toLowerCase();

  // check that input isn't null?

  if (input !== "") {
    let city = input;
    blah2(city);
  } else {
    alert(`You must enter a city name before clicking "Search".`);
    // The city name "userInput" does not exist. Please check for typos or enter another city name.
  }
}

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", search);

// should i initialize the object inside the function? or outside
/*
function getAltText(iconId) {
  let altTextObject = {
    "01d": "Yellow Sun",
    "01n": "Purple Crescent Moon surrounded by Yellow Stars",
    "02d": "Yellow Sun Behind White Cloud",
    "02n": "Purple Crescent Moon Behind White Cloud",
    "03d": "White Cloud",
    "03n": "White Cloud surrounded by Fuchsia Stars",
    "04d": "",
    "04n": "",
    "09d": "White Cloud with 3 Raindrops",
    "09n": "White Cloud with 3 Raindrops",
    "10d": "Yellow Sun Behind White Cloud with 3 Raindrops",
    "10n": "Purple Crescent Moon Behind White Cloud with 3 Raindrops",
    "11d": "Yellow Sun Behind White Cloud with Lightning Bolt",
    "11n":
      "Purple Crescent Moon Behind White Cloud with Lightning Bolt surrounded by Yellow Stars",
    "13d": "White Cloud with Snowflakes",
    "13n": "Purple Crescent Moon Behind White Cloud with Snowflakes",
    "50d": "Yellow Sun with White Squiggly Mist Lines",
    "50n": "Purple Crescent Moon with White Squiggly Mist Lines",
  };

  return altTextObject[iconId];
}*/

// TO DO: change function to set both image and its alt text, instead of just alt text?
function setAltText(imgId, iconId) {
  let imgElement = document.getElementById(imgId);
  imgElement.alt = altTextObject[iconId];
}

function displayIcon(imgId, iconId) {
  let imgElement = document.getElementById(imgId);
  imgElement.src = `weather_icons/${iconId}.png`;
  imgElement.alt = altTextObject[iconId];
}
