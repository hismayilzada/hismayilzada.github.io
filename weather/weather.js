const wrapper = document.querySelector(".wrapper"),
inputPart = document.querySelector(".input-part"),
infoTxt = inputPart.querySelector(".info-txt"),
inputField = inputPart.querySelector("input"),
latitude = inputPart.querySelector("latitude"),
longitude = inputPart.querySelector("longitude"),
submitBtn = inputPart.querySelector(".submit"),
locationBtn = inputPart.querySelector("button.auto"),
weatherPart = wrapper.querySelector(".weather-part"),
wIcon = weatherPart.querySelector("img"),
arrowBack = wrapper.querySelector("header i");
const x = document.getElementById("demo");


function getByCoord(latitude, longitude) {
    onSuccess(latitude, longitude);
}

function showPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    console.log("Latitude: " + latitude);
    console.log("Longitude: " + longitude);

    onSuccess(latitude, longitude);
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  x.innerHTML = "Latitude: " + position.coords.latitude + 
  "<br>Longitude: " + position.coords.longitude;
}

let api;

inputField.addEventListener("keyup", e =>{
    if(e.key == "Enter" && inputField.value != ""){
        requestApi(inputField.value);
    }
});
submitBtn.addEventListener("click", () =>{
    requestApi(submitBtn);
});
locationBtn.addEventListener("click", () =>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }else{
        alert("Your browser does not support geolocation api");
    }
});
function requestApi(city){
    api=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=588e1ae2385a42dd118e623f56b15fd6`
    fetchData();
}

function onSuccess(position){
    const {latitude, longitude} = position.coords;
    api=`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=588e1ae2385a42dd118e623f56b15fd6`
    fetchData();
}
function onError(error){
    infoTxt.innerText = error.message;
    infoTxt.classList.add("error");
}

function fetchData(){
    infoTxt.innerText = "keep Calm... It's loading...";
    infoTxt.classList.add("loading");
    fetch(api).then(res => res.json()).then(result => weatherDetails(result)).catch(() =>{
        infoTxt.innerText = "Something went wrong";
        infoTxt.classList.replace("loading", "error");
    });
}
function weatherDetails(info){
    if(info.cod == "404"){
        infoTxt.classList.replace("pending", "error");
        infoTxt.innerText = `${inputField.value} isn't a valid city name`;
        latitude.innerText = `${latitude.value} isn't a valid latitude`;
        longitude.innerText = `${longitude.value} isn't a valid longitude`;
    }else{
        const city = info.name;
        const country = info.sys.country;
        const {description, id} = info.weather[0];
        const {temp, feels_like, humidity, pressure, temp_min, temp_max} = info.main;
        const wind_speed = info.wind.speed;
        const wind_d = info.wind.deg;
        const windDir = getDirection(wind_d);

        if(id == 800){
            wIcon.src = "clear.gif";
        }else if(id >= 200 && id <= 232){
            wIcon.src = "thunder.gif";  
        }else if(id >= 600 && id <= 622){
            wIcon.src = "snow.gif";
        }else if(id >= 701 && id <= 781){
            wIcon.src = "haze.gif";
        }else if(id >= 801 && id <= 804){
            wIcon.src = "cloud.gif";
        }else if((id >= 500 && id <= 531) || (id >= 300 && id <= 321)){
            wIcon.src = "rain.gif";
        }
        
        weatherPart.querySelector(".temp .numb").innerText = Math.floor(temp);
        weatherPart.querySelector(".weather").innerText = description;
        weatherPart.querySelector(".location span").innerText = `${city}, ${country}`;
        var d = new Date();
        document.getElementById("date").innerHTML = d.toLocaleDateString();
        var t = new Date();
        document.getElementById("time").innerHTML = t.toLocaleTimeString();
        weatherPart.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
        weatherPart.querySelector(".humidity span").innerText = `${humidity}%`;
        weatherPart.querySelector(".pressure span").innerText = `${pressure} P`;
        weatherPart.querySelector(".min span").innerText = Math.floor(temp_min) + " °C";
        weatherPart.querySelector(".max span").innerText = Math.floor(temp_max)+ " °C";
        weatherPart.querySelector(".wind span").innerText = `${wind_speed} km/h ${windDir}`;
        //weatherPart.querySelector(".wind span").innerText =`${windDir}`;
        infoTxt.classList.remove("pending", "error");
        infoTxt.innerText = "";
        inputField.value = "";
        wrapper.classList.add("active");

    }
}
function getDirection(angle) {
    var directions = ['North', 'North-East', 'East', 'South-East', 'South', 'South-West', 'West', 'North-West'];
    var index = Math.round(((angle %= 360) < 0 ? angle + 360 : angle) / 45) % 8;
    return directions[index];
}
arrowBack.addEventListener("click", ()=>{
    wrapper.classList.remove("active");
});
