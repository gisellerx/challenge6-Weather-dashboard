var apiKey = "3b104c2232eb817eda16cdfc92cbe1af"
var titleEl = document.getElementById("title")
var tempEl = document.getElementById("temp")
var windEl = document.getElementById("wind")
var humidityEl = document.getElementById("humidity")
var searchBtn = document.getElementById("search-btn")
var cityInput = document.getElementById("city-input")

function searchCity(event) {
    event.preventDefault()
    var cityName = cityInput.value

    displayWeather(cityName)
}

function displayWeather(cityName) {
    var url = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid="+ apiKey+"&units=imperial"

    fetch(url)
    .then(function(response) {
        return response.json()
    })
    .then(function(currentData) {
        console.log(currentData)
    })

    var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q="+cityName+"&appid="+apiKey+"&units=imperial"

    fetch(forecastUrl)
    .then(function(response) {
        return response.json()
    })
    .then(function(forecastData) {
        console.log(forecastData)
        // grab every 12pm for each day for 5 days
        var forecastArray = forecastData.list
        for (let i = 4; i < forecastArray.length; i=i+8) {  
            console.log(forecastArray[i]) 
        }
    })
}

searchBtn.addEventListener("click", searchCity)

