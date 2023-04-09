let searchCity = document.querySelector("#cityInput");
let btnSearch = document.querySelector(".btn-primary");
let current = document.querySelector("#currentWeather");

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
        weather(coordinateLat, coordinateLon); // (lat, lon)
      });
    } else {
      alert("Error: " + response.statusText);
    }
  });
});

let weather = function (lat, lon) {
  let weatherDataAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}`;
  fetch(weatherDataAPI).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        // let cityName = document.createElement("h2");
        // cityName.textContent = data.name;
        // current.appendChild(cityName);
        // let temp = document.createElement("p");
        // temp.textContent = data.main.temp;
        // current.appendChild(temp);
        // let humidity = document.createElement("p");
        // humidity.textContent = data.main.humidity;
        // current.appendChild(humidity);
        // let windSpeed = document.createElement("p");
        // windSpeed.textContent = data.wind.speed;
        // current.appendChild(windSpeed);
        // let uvIndex = document.createElement("p");
        // uvIndex.textContent = data.main.uvi;
        // current.appendChild(uvIndex);
      });
    } else {
      alert("Error: " + response.statusText);
    }
  });
};
// https://utoronto.bootcampcontent.com/utoronto-bootcamp/UTOR-VIRT-FSF-PT-02-2023-U-LOLC/-/tree/main/06-Server-Side-APIs/02-Challenge
//https://openweathermap.org/api/geocoding-api
// https://openweathermap.org/current#name
