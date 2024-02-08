//aim: ensuring user input is taken into account, and input will be shown in weather app

function input(event){
    event.preventDefault();
    let cityInput = document.querySelector(".city-input");
    
    let h1= document.querySelector(".city-name");
    h1.innerHTML = cityInput.value;
}

let userInput = document.querySelector("form");
userInput.addEventListener("submit",input);
