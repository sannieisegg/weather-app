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
    
    h1.innerHTML = response.data.city;
    displayTemp.innerHTML = Math.round(tempCurrent);
    description.innerHTML = response.data.condition.description;


    
}
