let now = new Date();
let currentDay = document.querySelector("#current-day");
let currentTime = document.querySelector("#time");
let date = document.querySelector("#date");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

currentDay.innerHTML = `${days[now.getDay()]}`;

let hour = now.getHours();
if (hour < 1) {
  hour = hour + 12;
} else {
  if (hour > 12) {
    hour = hour - 12;
  } else {
    hour = now.getHours();
  }
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

currentTime.innerHTML = `${hour}:${minutes}`;
let currentDate = now.getDate();
date.innerHTML = `${now.getMonth() + 1}/${currentDate}/${now.getFullYear()}`;

function updateTemp(response) {
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = `${Math.round(response.data.main.temp)}`;
  let currentCity = document.querySelector("#city");
  currentCity.innerHTML = `${response.data.name}`;
}

function searchCity(city) {
  let apiKey = `913b7ac1ecf2018545f41afe76c8aad3`;
  let units = `imperial`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?`;
  let fullUrl = `${apiUrl}q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(fullUrl).then(updateTemp);
}

function formSearch(event) {
  event.preventDefault();
  let city = document.querySelector(".searchBar").value;
  let apiKey = `913b7ac1ecf2018545f41afe76c8aad3`;
  let units = `imperial`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?`;
  let fullUrl = `${apiUrl}q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(fullUrl).then(updateTemp);
}
let searchForm = document.querySelector("form");
searchForm.addEventListener("submit", formSearch);

function findMe(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let units = `imperial`;
  let apiKey = `913b7ac1ecf2018545f41afe76c8aad3`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(updateTemp);
}
function getLocation(event) {
  navigator.geolocation.getCurrentPosition(findMe);
}

let geoLocationBtn = document.querySelector("#geoLocation");
geoLocationBtn.addEventListener("click", getLocation);

searchCity("Dallas");
