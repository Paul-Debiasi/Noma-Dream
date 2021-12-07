const nomadList = document.getElementById("nom_list");
// const locations = document.querySelector(".locations");

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
  let key = `48e5ed59594b37527de32fde9a0edaca`;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`;
  try {
    const response = await fetch(url);
    data = await response.json();
    console.log(data);
    displayWeather(data);
  } catch (err) {
    console.log(`Error occurred getting the Weather: ${err} `);
  }
}

const displayWeather = (data) => {
  const foots = document.querySelectorAll(".foot");

  foots.forEach((item) => {
    const weather = document.createElement("div");
    weather.classList.add("weatherDiv");
    weather.style.cssText =
      "color:black; margin-bottom: 10px; position: relative; bottom:10px; height:70px; padding-left:10px";
    const span = document.createElement("span");
    span.textContent = `Weather: ${data.weather[0].description}`;
    const img = document.createElement("img");
    img.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    console.log("img", img);

    const deg = document.createElement("span");
    deg.textContent = data.main.temp;
    deg;
    item.append(weather);
    weather.append(span, img, deg);
  });
};
const over = document.querySelector(".hoverload");

// displayWeather();

const displayList = (data) => {
  //   console.log("Data inside display function ", data);
  let htmlString = data
    .map((item) => {
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
          !item.logo
            ? `https://www.google.com/imgres?imgurl=https%3A%2F%2Fdynamic.brandcrowd.com%2Fasset%2Flogo%2F7b65938e-98c8-458f-995a-e14ef9087fa0%2Flogo-search-grid-desktop%3Fv%3D637720226613970000&imgrefurl=https%3A%2F%2Fwww.brandcrowd.com%2Fmaker%2Ftag%2Ftext%2Fpage2&tbnid=e7g3LQ-4GM5a4M&vet=10CBcQxiAoB2oXChMIkMGNhM7R9AIVAAAAAB0AAAAAEAg..i&docid=1lO4XIDWd0KYmM&w=278&h=222&itg=1&q=free%20logo&ved=0CBcQxiAoB2oXChMIkMGNhM7R9AIVAAAAAB0AAAAAEAg`
            : item.logo
        }" alt="" />
        </div>
        <div class="foot">
          <a href="${
            item.site
          }" target="_blank" rel="noopener noreferrer">Our Webpage</a>
          <h2>${item.name}</h2>
          <h3>${item.city},<span>${item.country}</span></h3>
        
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
