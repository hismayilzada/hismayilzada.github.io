// const form = document.querySelector(".top-banner form");
// const input = document.querySelector(".top-banner input");
// const msg = document.querySelector(".top-banner .msg");
// const list = document.querySelector(".ajax-section .cities");
// const apiKey = "588e1ae2385a42dd118e623f56b15fd6";


const x = document.getElementById("demo");

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

// function showError(error) {
//   switch(error.code) {
//     case error.PERMISSION_DENIED:
//       x.innerHTML = "User denied the request for Geolocation."
//       break;
//     case error.POSITION_UNAVAILABLE:
//       x.innerHTML = "Location information is unavailable."
//       break;
//     case error.TIMEOUT:
//       x.innerHTML = "The request to get user location timed out."
//       break;
//     case error.UNKNOWN_ERROR:
//       x.innerHTML = "An unknown error occurred."
//       break;
//   }
// }
// form.addEventListener("submit", e => {
//   e.preventDefault();
//   const listItems = list.querySelectorAll(".ajax-section .city");
//   const inputVal = input.value;

//   //ajax here
//   const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;
//   const u=`https://restcountries.com/v3.1/alpha/{code}`;
//   fetch(url)
//     .then(response => response.json())
//     .then(data => {
//       const { main, name, sys, weather } = data;
//       const icon = `https://openweathermap.org/img/wn/${
//         weather[0]["icon"]
//       }@2x.png`;

//       const li = document.createElement("li");
//       li.classList.add("city");
//       const markup = `
//         <h2 class="city-name" data-name="${name},${sys.country}">
//           <span>${name}</span>
//           <sup>${sys.country}</sup>
//         </h2>
//         <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
//         <figure>
//           <img class="city-icon" src=${icon} alt=${weather[0]["main"]}>
//           <figcaption>${weather[0]["description"]}</figcaption>
//         </figure>
//       `;
//       li.innerHTML = markup;
//       list.appendChild(li);
//     })

//     fetch(u)
//     .then(response => response.json())
//     .then(data => {
//       const { main, name, sys, weather } = data;
//       const icon = `https://openweathermap.org/img/wn/${
//         weather[0]["icon"]
//       }@2x.png`;

//       const li = document.createElement("li");
//       li.classList.add("city");
//       const markup = `
//         <h2 class="city-name" data-name="${name},${sys.country}">
//           <span>${name}</span>
//           <sup>${sys.country}</sup>
//         </h2>
//         <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
//         <figure>
//           <img class="city-icon" src=${icon} alt=${weather[0]["main"]}>
//           <figcaption>${weather[0]["description"]}</figcaption>
//         </figure>
//       `;
//       li.innerHTML = markup;
//       list.appendChild(li);
//     })
//   msg.textContent = "";
//   form.reset();
//   input.focus();
// });