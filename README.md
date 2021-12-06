# Description

A single page Weather Forecast web application.
Check out the project [here](https://modest-sammet-e184ff.netlify.app)!

# Tech Used

This project was built with HTML/CSS, Bootstrap, and Vanilla JavaScript. This project uses [OpenWeather](https://openweathermap.org/) APIs to get current weather and forecast information.

# Project Requirements
* Display current date and time (of the user)
* Display location (Montreal, Canada by default)
* Allow user's to display a specific city's weather information, by:
  1. Entering the name of any city OR
  2. Use the user's current location
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

# Examples

<img width="1920" alt="Screen Shot 2021-12-01 at 10 31 02 PM" src="https://user-images.githubusercontent.com/29237731/144353068-4815f550-323a-44e5-89ce-c2b6f93a482c.png">
