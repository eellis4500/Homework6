$(document).ready(function () {


var icon = document.getElementById("icon")
var cityName = document.getElementById("cityName")
var temperature = document.getElementById("temperature")
var humidity = document.getElementById("humidity")
var windSpeed = document.getElementById("windSpeed")
var uvIndex = document.getElementById("uvIndex")
var search = document.getElementById("search")
var city1 = document.getElementById("city1")
var cityName2 = "City Name"
var cityStorage = JSON.parse(localStorage.getItem(cityName2)) || []

function getWeather(location) {
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&units=imperial&appid=8b5c3fac3318808254a932ee23387d1b",
        method: "GET"
    })
        .then(function (octopus) {
            icon.src = "https://openweathermap.org/img/wn/" + octopus.weather[0].icon + "@2x.png";
            cityName.textContent = octopus.name + " (" + new Date().toLocaleDateString() + ")";
            temperature.textContent = "Temperature: " + octopus.main.temp + "°F";
            humidity.textContent = "Humidity: " + octopus.main.humidity + "%";
            windSpeed.textContent = "Wind Speed: " + octopus.wind.speed + " MPH";
            var lat = octopus.coord.lat;
            var lon = octopus.coord.lon;

            $.ajax({
                url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely&appid=8b5c3fac3318808254a932ee23387d1b",
                method: "GET"
            })

                .then(function (spockopus) {
                    uvIndex.textContent = "UV Index: " + spockopus.current.uvi;
                })
        });

    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/forecast?q=" + location + "&units=imperial&appid=8b5c3fac3318808254a932ee23387d1b",
        method: "GET"
    })
}

$(search).on('click', function (event) {
    var searchText = $('#searchText').val()
    cityStorage.push(searchText)
    localStorage.setItem(cityName2, JSON.stringify(cityStorage))
    city1.textContent = cityStorage[cityStorage.length - 2]

    getWeather(searchText)
        
})
    city1.textContent = cityStorage[cityStorage.length - 2]
    $(city1).on('click', function (event) {
        var citySearch = $('#city1').text()
        cityStorage.push(citySearch)
        localStorage.setItem(cityName2, JSON.stringify(cityStorage))
        city1.textContent = cityStorage[cityStorage.length - 2]
        getWeather(citySearch)
    })
})