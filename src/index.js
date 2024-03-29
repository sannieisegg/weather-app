//aim: ensuring user input is taken into account, and input will be shown in weather app

function input(event){
    event.preventDefault();
    let cityInput = document.querySelector(".city-input");
    searchCity(cityInput.value);
}

let userInput = document.querySelector("form");
userInput.addEventListener("submit",input);


//aim: ensuring search input directs me to the city's current temperature
//first step: learning to access any city's current temp (maybe through console.log)

//2 functions: one to call the city, another to link the city with temp

function searchCity(city) {
    let apiKey="49o09e00a5c35t44f5b2b77b02df6331";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
    axios.get(apiUrl).then(temperatureUpdate);

    let forecastUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
    axios.get(forecastUrl).then(weatherForecast);
}

function temperatureUpdate(response){
    //accessing city's current temp
    let tempCurrent = response.data.temperature.current;
    let displayTemp = document.querySelector(".current-temp");
    let h1= document.querySelector(".city-name");
    let description = document.querySelector("#description");
    let humidity = document.querySelector("#humidity");
    let wind = document.querySelector("#windSpeed");
    let time = document.querySelector("#dateTime");
    let dateTime = new Date(response.data.time * 1000);
    let imageIcon = document.querySelector("#icon");
    
    //console.log(response.data);

    h1.innerHTML = response.data.city;
    displayTemp.innerHTML = Math.round(tempCurrent);
    description.innerHTML = response.data.condition.description;
    humidity.innerHTML = response.data.temperature.humidity;
    wind.innerHTML = response.data.wind.speed;
    time.innerHTML = formatDate(dateTime);
    imageIcon.innerHTML = `<img src= "${response.data.condition.icon_url}" class="emoji" />`;
}


function formatDate(response){
    let dateTime = new Date();
    let hour = dateTime.getHours();
    let minutes = dateTime.getMinutes();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[dateTime.getDay()];

    if (minutes <10) {
        minutes = `0${minutes}`;
    }
    if (hour <10) {
        hour = `0${hour}`;
    }

    return `${day} ${hour}:${minutes}`;
}


function weatherForecast(response){
    //part 1: change icon url 
    let forecastIcons = document.querySelectorAll(".forecast-icon");

    let days = [response.data.daily[0].condition.icon_url, response.data.daily[1].condition.icon_url, response.data.daily[2].condition.icon_url, response.data.daily[3].condition.icon_url,
    response.data.daily[4].condition.icon_url];

    forecastIcons.forEach(function(iconElement, index){
        iconElement.innerHTML = `<img src= "${days[index]}" />`;
    });

    forecastDay(response);
    
};

function forecastDay(response){
    //part2: changing the forecasted days
    let forecastDays = document.querySelectorAll(".day");
    let forecastData = response.data.daily;
    let upcomingDays = ["Sun","Mon","Tues","Wed","Thurs","Fri","Sat"];

    //aim to retrieve value for upcoming days 
    forecastDays.forEach(function(forecastDay, index){
        let dateTime = new Date(forecastData[index].time * 1000);
        //to get the day of the week
        let upcomingDay = upcomingDays[dateTime.getDay()];
        forecastDay.innerHTML = upcomingDay; 
    });

    maxTemp(response);
};

function maxTemp(response){
    let maxTempForecasts = document.querySelectorAll(".max");
    console.log(response.data.daily[0].temperature.maximum);

    let upcomingMaxTemperatures = [response.data.daily[0].temperature.maximum, response.data.daily[1].temperature.maximum,
    response.data.daily[2].temperature.maximum,response.data.daily[3].temperature.maximum,
    response.data.daily[4].temperature.maximum,response.data.daily[5].temperature.maximum,
    response.data.daily[6].temperature.maximum];

    let roundedMaxTemps = upcomingMaxTemperatures.map(function(temp){
        return Math.round(temp);
    });

    console.log(roundedMaxTemps);

    maxTempForecasts.forEach(function (forecast,index){
        forecast.innerHTML = roundedMaxTemps[index];
    });

    minTemp(response);
};

function minTemp(response){
    let minTempForecasts = document.querySelectorAll(".min");

    let upcomingMinTemperatures = [response.data.daily[0].temperature.minimum, response.data.daily[1].temperature.minimum,
    response.data.daily[2].temperature.minimum,response.data.daily[3].temperature.minimum,
    response.data.daily[4].temperature.minimum,response.data.daily[5].temperature.minimum,
    response.data.daily[6].temperature.minimum];

    let roundedMinTemps = upcomingMinTemperatures.map(function(temp){
        return Math.round(temp);
    });

    console.log(roundedMinTemps);

    minTempForecasts.forEach(function (forecast,index){
        forecast.innerHTML = roundedMinTemps[index];
    });
}




    

    








    


   
  



  



