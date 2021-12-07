<img width="1440" alt="Screen Shot 2021-12-06 at 7 26 03 PM" src="https://user-images.githubusercontent.com/29237731/144943864-619dc23b-ed9c-4a9d-8344-25176bf4ae2f.png">

# Description

A single page Weather Forecast web application.
Check out the project [here](https://modest-sammet-e184ff.netlify.app)!

# Tech Used

This project was built with HTML/CSS, Bootstrap, and Vanilla JavaScript. This project uses [OpenWeather](https://openweathermap.org/) APIs to get current weather and forecast information.

# Project Requirements
* Display current date and time (of the user)
* Display location (Montreal, Canada by default)
* Allow users to display a specific city's weather information, via:
  1. Search engine (user can search for any city) OR
  2. The user's current location
* Display the current temperature, weather description (i.e. Sunny, Clouds, Clear, etc.), wind speed 
* Display icons to match the weather

# Icon List

The 3D weather icons used were [found on UI Freebies](https://uifreebies.net/icon/3d-weather-icons-free). The following icons were made using the UI freebies material:
* 04d.png
* 04n.png

<img src="https://user-images.githubusercontent.com/29237731/144928705-12adeca4-27ae-48d0-b4a2-8a84fad8bf16.png" width="600">

The default icons that come with the Open Weather API [can be found here](https://openweathermap.org/weather-conditions)

# Additional Features
* Forecast information (Next 5 Days)
* More weather information, such as Min/Max Temperature, time of sunset and sunrise, humidity, etc. 
* Five possible backgrounds, chosen based on time of day and weather condition:
  1. Day time [clear sky]
  2. Day time [all other weather conditions, i.e. cloudy, rainy, snowy, etc.]
  3. Sunset (+/- 30 mins from time of today's sunset) [any weather condition]
  4. Sunrise (+/- 30 mins from time of today's sunrise) [any weather condition]
  5. Night [any weather condition]

# Future Improvements / To Do
* Display timezone 
* Add more possible backgrounds for various weather conditions
* Implement responsiveness (make mobile-friendly)
* Use local storage to cache API calls
* Unit conversion (change between Celsius and Fahrenheit)
* Add more forecast information, such as Next 5 Hours  
* Improve web performance (how long the site, data, and images load)
* Improve code readability (comments, using more descriptive class/id/variable names)

# Backgrounds

<img width="1440" alt="Clear Day - Seoul" src="https://user-images.githubusercontent.com/29237731/144943602-5e86889a-6b7f-4dc6-b4ec-6d3a138b728f.png">

<img width="1440" alt="Cloudy Day - Singapore" src="https://user-images.githubusercontent.com/29237731/144943592-e0b7594c-e2ee-4c76-a923-4b7ffbd8ce41.png">

<img width="1440" alt="Sunset - San Diego" src="https://user-images.githubusercontent.com/29237731/144943631-e42d9ba8-20fe-4c5d-98da-b3eeca1112c2.png">

<img width="1440" alt="Night - Toronto" src="https://user-images.githubusercontent.com/29237731/144943611-ac9302f6-30f2-4ae2-be32-9dba6f852549.png">

<img width="1440" alt="Sunrise - Banff" src="https://user-images.githubusercontent.com/29237731/144943642-ef13599f-cc08-4e83-ae52-a3897ceee902.png">
