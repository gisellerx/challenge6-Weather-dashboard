var apiKey="3b104c2232eb817eda16cdfc92cbe1af"
var titleEl=document.getElementById("title")
var tempEl=document.getElementById("temp")
var windEl=document.getElementById("wind")
var humidityEl=document.getElementById("humidity")
var searchBtn=document.getElementById("search-btn")
var cityInput=document.getElementById("city-input")
var fivedayForcastEl= document.getElementById("fiveday-forcast")
var searchHistory=document.getElementById("search-history")


function searchCity() {
    var cityName=cityInput.value

    if (cityName.toLowerCase().includes(cityInput.value.toLowerCase())) {
        localStorage.setItem("city", JSON.stringify(cityName))
        createCityBtn(cityName)   
        displayWeather(cityName)
    }
}

function createCityBtn(cityName) {
    var li=document.createElement("li")
    var cityBtn=document.createElement("button")
    cityBtn.setAttribute("class", "btn btn-secondary w-100")
    cityBtn.setAttribute("id", "search-history")
    cityBtn.setAttribute("onclick", "searchCity()")
    cityBtn.innerHTML=cityName
    li.classList.add("list-group-item")
    li.appendChild(cityBtn)
    searchHistory.appendChild(li)
}

function displayWeather(cityName){
    var url="https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid="+ apiKey+"&units=imperial"

    fetch(url)
    .then(function(response){
        return response.json()
    })
    .then(function(currentData){
        console.log(currentData)
        titleEl.innerHTML=currentData.name + dayjs.unix(currentData.dt).format(" (MM/DD/YYYY)")+ "<img src='https://openweathermap.org/img/wn/"+ currentData.weather[0].icon+"@2x.png'>"
        tempEl.innerHTML="Temp: "+currentData.main.temp+" °F"
        windEl.innerHTML="Wind: "+currentData.wind.speed+" MPH"
        humidityEl.innerHTML="Humidity: "+currentData.main.humidity+" %"
    })

    var forecastUrl="https://api.openweathermap.org/data/2.5/forecast?q="+cityName+"&appid="+apiKey+"&units=imperial"

    fetch(forecastUrl)
    .then(function(response){
        return response.json()
    })
    .then(function(forecastData){
        console.log(forecastData)
        //grab every 12pm for each day for 5 days
        var forecastArr=forecastData.list

        for (let i=4, j=1; i < forecastArr.length; i=i+8, j++) {
             console.log(forecastArr[i])
               var cardTitle=document.getElementById("card-title"+j)
               console.log("card-title"+j)
               cardTitle.textContent=dayjs.unix(forecastArr[i].dt).format("(MM/DD/YYYY)")
               var temp=document.getElementById("temp"+j)
               temp.textContent="Temp: "+forecastArr[i].main.temp+" °F"
               var wind=document.getElementById("wind"+j)
               wind.textContent="Wind: "+forecastArr[i].wind.speed+" MPH"
               var humidity=document.getElementById("humidity"+j)
               humidity.textContent="Humidity: "+forecastArr[i].main.humidity+" %"
        }
    })
}

searchBtn.addEventListener("click", searchCity)
