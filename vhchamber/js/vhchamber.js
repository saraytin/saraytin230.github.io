const apiKey = 'f062c5ac3e102c4047925dcbb3d80bdc';
const date = new Date();
const day = [" Sunday", " Monday", "Tuesday", " Wednesday", " Thursday", "Friday", " Saturday", " Sunday"];
const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
weatherUpdate();
lastModified();
/* document.getElementById("date").innerHTML = day[date.getDay()] +
", " + date.getDate() + " " + month[date.getMonth()] + " " +
date.getFullYear(); */

function imageLoad() {
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
}

function lastModified() {
    var lastModified = document.lastModified;
    document.getElementById("date").innerHTML = "Last Updated on " + lastModified;
    document.getElementById("year").innerHTML = date.getFullYear();
}

function toggleMenu() {
    var x = document.getElementById("navbar");
    if (x.className === "navigation") {
      x.className += " responsive";
    } else {
      x.className = "navigation";
    }
}

let imagesToLoad = document.querySelectorAll('[data-src]');
const loadImages = (image) => {
  image.setAttribute('src', image.getAttribute('data-src'));
  image.onload = () => {
    image.removeAttribute('data-src');
  };
};

function weatherUpdate() {
    const weatherURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=33.4487&lon=-86.7878&exclude=minutely,hourly&units=imperial&appid=';
    let requestURL = weatherURL + apiKey;
    fetch(requestURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (jsonObject) {
        /* console.log(jsonObject); */
        document.getElementById("currTemp").innerHTML = 'Temperature: ' + Math.round(jsonObject.current.temp) + '℉';
        document.getElementById("currWeather").innerHTML = 'With ' + jsonObject.current.weather[0].description;
        document.getElementById("humidity").innerHTML = 'Humidity: ' + jsonObject.current.humidity + '%';
        for (i = 0; i < 3; i++) {
          let card = document.createElement('section');
          let label = document.createElement('h4');
          let img = document.createElement('img');
          let temp = document.createElement('p');
          let dayName = day[date.getDay()+i];
          let imgsrc = 'https://openweathermap.org/img/wn/' + jsonObject.daily[i].weather[0].icon + '@2x.png';
          let imgalt = jsonObject.daily[i].weather[0].description;
          label.textContent = dayName;
          img.setAttribute('src', imgsrc);
          img.setAttribute('alt', imgalt);
          temp.textContent = Math.round(jsonObject.daily[i].temp.day) + '℉';
          card.appendChild(label);
          card.appendChild(img);
          card.appendChild(temp);
          document.querySelector('div.forecast').appendChild(card);
        }
        var show = document.getElementById('alert');
        if (typeof jsonObject.alerts != "undefined") {
            show.style.display = (show.style.display == 'block') ? 'none' : 'block';
            document.getElementById("alert-message").innerHTML = jsonObject.alerts[0].event;
        }
        else {
            show.style.display = (show.style.display == 'none') ? 'block' : 'none';
        }
      });
}