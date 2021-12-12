const nomadList = document.getElementById("nom_list");

async function loadNomad() {
  try {
    const response = await fetch("data.json");

    const data = await response.json();

    const searchBar = document.getElementById("searchwrapper");
    searchBar.addEventListener("keyup", (e) => {
      const searchValue = e.target.value.toLowerCase();
      getWeather(searchValue);

      let filterSearch = [];
      filterSearch = data.filter((item) => {
        return (
          item.name.toLowerCase().includes(searchValue) ||
          item.city.toLowerCase().includes(searchValue) ||
          item.country.toLowerCase().includes(searchValue)
        );
      });

      displayList(filterSearch);
    });
  } catch (err) {
    console.log(`Error on Loading Nomad: ${err}`);
  }
}

async function getWeather(city) {
  let key = "";
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`;
  try {
    const response = await fetch(url);
    console.log(`The Response: ${response}`);

    data = await response.json();
    console.log(data);
    displayWeather(data);
  } catch (err) {
    console.log(`Error occurred getting the Weather: ${err} `);
  }
}

const displayWeather = (data) => {
  const foots = document.querySelectorAll(".foot-container");
  foots.forEach((item) => {
    const weather = document.createElement("div");
    weather.classList.add("weatherDiv");
    weather.style.cssText =
      "color:black; margin-bottom: 10px; position: relative; bottom:10px; height:70px; padding-left:10px";

    const img = document.createElement("img");
    img.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    console.log("img", img);

    const deg = document.createElement("span");
    deg.textContent = `${data.main.temp} C°`;

    item.append(weather);
    weather.append(img, deg);
  });
};

const displayList = (data) => {
  let htmlString = data
    .map((item) => {
      console.log("My logo :", item.logo);
      if (item.logo === "NO-LOGO") console.log("________------");
      return `
      <li class='locations' >
      <div class="hoverload">
      <h2>${item.name}</h2>
      <p> ${item.description}</p>
      <p class="addr"> Address: ${item.map.address}</p>
      
      </div>
      <div class="conta" style="background:rgba(255, 255, 255, 0.9) url(${
        item.cover
      }) no-repeat;">
        <img src="${
          item.logo.trim() === "NO-LOGO"
            ? `https://cdn.pixabay.com/photo/2016/09/14/20/50/teeth-1670434_960_720.png`
            : item.logo
        }" alt="" />
          </div>
        <div class="foot">
        <div class="foot-container">
        <div class="co-info">
        <a href="${
          item.site
        }" target="_blank"        rel="noopener noreferrer">${item.name}</a>
        <span>${item.city} - ${item.country}</span>
        <span onclick="addingMore()"  class= "more">Learn more!</span>
        </div>
        </div>
        <ul id="contact">
        <li><i class="fab fa-facebook"></i></li>
        <li><i class="fab fa-linkedin"></i></li>
        <li><i class="fab fa-instagram"></i></li>
           </ul>
           </div>
           </li>
           `;
    })
    .join("");
  nomadList.innerHTML = htmlString;
};

loadNomad();

// async function callGlobal() {
//   let password = "dimenticata1";
//   let userName = "iyaakashevastudio@gmail.com";
//   let url = `https://coworkingmap.org/wp-json/jwt-auth/v1/token/?username=${userName}&password=${password}`;

//   const response = await fetch(url, {
//     method: "POST",
//   });

//   const data = await response.json();
//   console.log(`My data : ${data}`);
// }

// callGlobal();
