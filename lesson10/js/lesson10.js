const date = new Date();
const day = [" Sunday", " Monday", "Tuesday", " Wednesday", " Thursday", "Friday", " Saturday"];
const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const apiKey = 'f062c5ac3e102c4047925dcbb3d80bdc';
document.getElementById("date").innerHTML = day[date.getDay()] +
", " + date.getDate() + " " + month[date.getMonth()] + " " +
date.getFullYear();

document.getElementById("year").innerHTML = date.getFullYear();

function eventBanner() {
  var now = new Date();
  var dayOfWeek = now.getDate();
  var show = document.getElementById('event-banner');

  if (dayOfWeek == 5) {
      show.style.display = (show.style.display == 'block') ? 'none' : 'block';
      }
      else {
          show.style.display = (show.style.display == 'none') ? 'block' : 'none';
      }
}

function toggleMenu() {
    var x = document.getElementById("navbar");
    if (x.className === "navigation") {
      x.className += " responsive";
    } else {
      x.className = "navigation";
    }
}

function townPage() {
  weatherUpdate();
  forecast();
  eventBanner();
  let temp = parseFloat(document.getElementById("currTemp").textContent);
  let speed = parseFloat(document.getElementById("windSpeed").textContent);
  if (temp <= 50 && speed >= 3)  {
    document.getElementById('chillTemp').innerHTML = windChill(temp,speed)+'&#8457;';
  }
  else {
    document.getElementById("chillTemp").innerHTML = "N/A";
  }
  
}

function windChill(t,s) {
  let w = Math.round(35.74 + 0.6215 * t - 35.75 * Math.pow(s, 0.16) + 0.4275 * t * Math.pow(s, 0.16));
return w;
}

let imagesToLoad = document.querySelectorAll('[data-src]');
const loadImages = (image) => {
  image.setAttribute('src', image.getAttribute('data-src'));
  image.onload = () => {
    image.removeAttribute('data-src');
  };
};

if('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((items, observer) => {
      items.forEach((item) => {
        if(item.isIntersecting) {
          loadImages(item.target);
          observer.unobserve(item.target);
        }
      });
    });
    imagesToLoad.forEach((img) => {
      observer.observe(img);
    });
  } else {
    imagesToLoad.forEach((img) => {
      loadImages(img);
    });
}

function adjustRating(rating) {
    document.getElementById("stormRating").innerHTML = rating;
}

function homePage() {
  const requestURL = 'https://byui-cit230.github.io/weather/data/towndata.json';
  fetch(requestURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (jsonObject) {
      const towns = jsonObject['towns'];
      for (let i = 0; i < towns.length; i++) {
        if (towns[i].name == "Preston" || towns[i].name == "Fish Haven" || towns[i].name == "Soda Springs") {
          let card = document.createElement('section');
          let townCard = document.createElement('dl');
          townCard.setAttribute('class', 'townCard');
          let photo = document.createElement('img');
          let name = document.createElement('h3');
          let motto = document.createElement('p');
          let yearFoundedDiv = document.createElement('div');
          let currentPopulationDiv = document.createElement('div');
          let averageRainfallDiv = document.createElement('div');
          let yearFoundedNum = document.createElement('dt');
          let yearFoundedLabel = document.createElement('dd');
          let currentPopulationNum = document.createElement('dt');
          let currentPopulationLabel = document.createElement('dd');
          let averageRainfallNum = document.createElement('dt');
          let averageRainfallLabel = document.createElement('dd');
          name.textContent = towns[i].name;
          motto.textContent = towns[i].motto;
          yearFoundedNum.textContent = towns[i].yearFounded;
          currentPopulationNum.textContent = towns[i].currentPopulation;
          averageRainfallNum.textContent = towns[i].averageRainfall + "\"";
          yearFoundedLabel.textContent = "Founded";
          currentPopulationLabel.textContent = "Population";
          averageRainfallLabel.textContent = "Rain / Year";
          photo.setAttribute('src', "images/" + towns[i].photo);
          photo.setAttribute('alt', "image of " + towns[i].name);
          card.appendChild(photo);
          card.appendChild(name);
          card.appendChild(motto);
          card.appendChild(townCard);
          townCard.appendChild(yearFoundedDiv);
          townCard.appendChild(currentPopulationDiv);
          townCard.appendChild(averageRainfallDiv);
          yearFoundedDiv.appendChild(yearFoundedNum);
          yearFoundedDiv.appendChild(yearFoundedLabel);
          currentPopulationDiv.appendChild(currentPopulationNum);
          currentPopulationDiv.appendChild(currentPopulationLabel);
          averageRainfallDiv.appendChild(averageRainfallNum);
          averageRainfallDiv.appendChild(averageRainfallLabel);
          document.querySelector('div.cards').appendChild(card);
        }
      }
    });
  }

function weatherUpdate() {
  const weatherURL = 'https://api.openweathermap.org/data/2.5/weather?id=5604473&units=imperial&appid=';
  let requestURL = weatherURL + apiKey;
  fetch(requestURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (jsonObject) {
      console.log(jsonObject);
      let desc = jsonObject.weather[0].description;
      let temp = jsonObject.main.temp;
      let humidity = jsonObject.main.humidity;
      let windSpeed = jsonObject.wind.speed;
      document.getElementById("currWeather").innerHTML = desc;
      document.getElementById("currTemp").innerHTML = temp;
      document.getElementById("humidity").innerHTML = humidity;
      document.getElementById("windSpeed").innerHTML = windSpeed;
    });
}

function forecast() {
  const forecastURL = 'https://api.openweathermap.org/data/2.5/forecast?id=5604473&units=imperial&appid=';
  let requestURL = forecastURL + apiKey;
  let monthTemp = date.getMonth() + 1;
  if (monthTemp < 10) {
    var monthNum = '0' + monthTemp;
  }
  else {
    var monthNum = '' + monthTemp;
  }
  const yearMonthDay = date.getFullYear() + "-" + monthNum + "-" + date.getDate();
  console.log(yearMonthDay);
  fetch(requestURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (jsonObject) {
      console.log(jsonObject);
      let day = 1;
      let dow = [" Sunday", " Monday", "Tuesday", " Wednesday", " Thursday", "Friday", " Saturday"];
      jsonObject.list.forEach(element => {
          if (element.dt_txt.includes("18:00:00")) {
              let d = new Date(element.dt_txt);
              let card = document.createElement('section');
              let label = document.createElement('h4');
              let img = document.createElement('img');
              let temp = document.createElement('p');
              let high = element.main.temp_max;
              let dayName = dow[d.getDay()];
              let imgsrc = 'https://openweathermap.org/img/wn/' + element.weather[0].icon + '@2x.png';
              let imgalt = element.weather[0].description;
              label.textContent = dayName;
              img.setAttribute('src', imgsrc);
              img.setAttribute('alt', imgalt);
              temp.textContent = Math.round(high) + '℉';
              card.appendChild(label);
              card.appendChild(img);
              card.appendChild(temp);
              document.querySelector('div.forecast').appendChild(card);

              // autoincrements my day variable
              day++;
          }
      /* console.log(jsonObject.list.length);
      var i = 0;
      while (i < jsonObject.list.length) {
        console.log(jsonObject.list[i]);
        if (jsonObject.list[i].dt_txt.includes("18:00:00") && !(jsonObject.list[i].dt_txt.includes(yearMonthDay))) {
          console.log(jsonObject.list[i]);
          let card = document.createElement('section');
          let label = document.createElement('h4');
          let img = document.createElement('img');
          let temp = document.createElement('p');
          let high = jsonObject.list[i].main.temp_max;
          let dayName = day[date.getDay()+i];
          let imgsrc = 'https://openweathermap.org/img/wn/' + jsonObject.list[i].weather[0].icon + '@2x.png';
          let imgalt = jsonObject.list[i].weather[0].description;
          label.textContent = dayName;
          img.setAttribute('src', imgsrc);
          img.setAttribute('alt', imgalt);
          temp.textContent = Math.round(high);
          card.appendChild(label);
          card.appendChild(img);
          card.appendChild(temp);
          document.querySelector('div.forecast').appendChild(card);
        }
      } */
    });
});
}