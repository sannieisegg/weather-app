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
    
    console.log(response.data);

    h1.innerHTML = response.data.city;
    displayTemp.innerHTML = Math.round(tempCurrent);
    description.innerHTML = response.data.condition.description;
    humidity.innerHTML = response.data.temperature.humidity;
    wind.innerHTML = response.data.wind.speed;
    time.innerHTML = formatDate(dateTime);
}


function formatDate(dateTime){
    let hour = dateTime.getHours();
    let minutes = dateTime.getMinutes();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[dateTime.getDay()];

    if (minutes <10) {
        minutes = `0{minutes}`;
    }

    if (hour <10) {
        hour = `0{hour}`;
    }

    return `${day} ${hour}:${minutes}`;

    
}
