const apiKey = 'f062c5ac3e102c4047925dcbb3d80bdc';
weatherUpdate();
forecast();
eventBanner();
events();

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
  
function windChill(t,s) {
    let w = Math.round(35.74 + 0.6215 * t - 35.75 * Math.pow(s, 0.16) + 0.4275 * t * Math.pow(s, 0.16));
  return w;
}

function weatherUpdate() {
    const weatherURL = 'https://api.openweathermap.org/data/2.5/weather?id=5678757&units=imperial&appid=';
    let requestURL = weatherURL + apiKey;
    fetch(requestURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (jsonObject) {
        console.log(jsonObject);
        document.getElementById("currWeather").innerHTML = jsonObject.weather[0].description;
        document.getElementById("humidity").innerHTML = jsonObject.main.humidity;
        let temp = jsonObject.main.temp;
        let speed = jsonObject.wind.speed;
        document.getElementById("currTemp").innerHTML = temp;
        document.getElementById("windSpeed").innerHTML = speed;
        if (temp <= 50 && speed >= 3)  {
            document.getElementById('chillTemp').innerHTML = windChill(temp,speed)+'&#8457;';
        }
        else {
            document.getElementById("chillTemp").innerHTML = "N/A";
        }
      });
}
  
function forecast() {
const forecastURL = 'https://api.openweathermap.org/data/2.5/forecast?id=5678757&units=imperial&appid=';
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

function events() {
    const requestURL = 'https://byui-cit230.github.io/weather/data/towndata.json';
    fetch(requestURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (jsonObject) {
        const towns = jsonObject['towns'];
        for (let i = 0; i < towns.length; i++) {
          if (towns[i].name == "Soda Springs") {
            console.log(towns[i].events);
            let card = document.createElement('section');
            card.setAttribute('class', 'eventCard');
            let eventHead = document.createElement('h3');
            let event1 = document.createElement('p');
            let event2 = document.createElement('p');
            let event3 = document.createElement('p');
            eventHead.textContent = 'Upcoming Events';
            event1.textContent = towns[i].events[0];
            event2.textContent = towns[i].events[1];
            event3.textContent = towns[i].events[2];
            card.appendChild(eventHead);
            card.appendChild(event1);
            card.appendChild(event2);
            card.appendChild(event3);
            document.querySelector('div.events').appendChild(card);
          }
        }
      });
}