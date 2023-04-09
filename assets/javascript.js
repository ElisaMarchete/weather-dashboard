let searchCity = document.querySelector("#cityInput");
let btnSearch = document.querySelector(".btn-primary");
let currentWeather = document.querySelector("#currentWeather");

let APIKey = "b374870660328eeb7ba148b79cafb75b";

btnSearch.addEventListener("click", function (event) {
  event.preventDefault();
  let city = searchCity.value.trim();
  let coordinatesAPI = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${APIKey}`;
  fetch(coordinatesAPI).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        let coordinateLat = data[0].lat;
        let coordinateLon = data[0].lon;
        weather(coordinateLat, coordinateLon, city); // (lat, lon, city)
      });
    } else {
      alert("Error Please Enter a Valid City Name");
    }
  });
});

let weather = function (lat, lon, city) {
  // coordinateLat, coordinateLon
  let weatherDataAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}&units=metric`;
  fetch(weatherDataAPI).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);

        // The weather details for currently day
        let rightNow = dayjs().format("(M/DD/YYYY)");
        let cityName = document.createElement("h3");
        cityName.textContent = "City: " + city + " " + rightNow;
        currentWeather.appendChild(cityName);

        let temp = document.createElement("p");
        temp.textContent = "Temp: " + data.main.temp + "°C";
        currentWeather.appendChild(temp);

        let feelsLike = document.createElement("p");
        feelsLike.textContent = "Feels Like: " + data.main.feels_like + "°C";
        currentWeather.appendChild(feelsLike);

        let wind = document.createElement("p");
        wind.textContent = "Wind: " + data.wind.speed + "km/h";
        currentWeather.appendChild(wind);

        let humididy = document.createElement("p");
        humididy.textContent = "Humidity: " + data.main.humidity + "%";
        currentWeather.appendChild(humididy);

        // The weather icon
        let weatherCode = data.weather[0].icon;
        let iconUrl = `https://openweathermap.org/img/w/${weatherCode}.png`;
        let iconElement = document.createElement("img");
        iconElement.src = iconUrl;
        currentWeather.appendChild(iconElement);

        // The weather forecast data for the next 5 days
        let forecastURL = "https://api.openweathermap.org/data/2.5/forecast";
        let requestForecast = `${forecastURL}?q=${city}&appid=${APIKey}`;
        fetch(requestForecast)
          .then((response) => response.json())
          .then((data) => {
            let forecastData = data.list;
            console.log(forecastData);
          });
      });
    }
  });
};
// https://utoronto.bootcampcontent.com/utoronto-bootcamp/UTOR-VIRT-FSF-PT-02-2023-U-LOLC/-/tree/main/06-Server-Side-APIs/02-Challenge
//https://openweathermap.org/api/geocoding-api
// https://openweathermap.org/current#name
