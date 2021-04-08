const apiKey = 'f062c5ac3e102c4047925dcbb3d80bdc';
const date = new Date();
const day = [" Sunday", " Monday", "Tuesday", " Wednesday", " Thursday", "Friday", " Saturday", " Sunday"];
const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
/* const phImage = "https://saraytin.github.io/vhchamber/images/placeholder.jpg" */

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
          let imageURL = 'https://openweathermap.org/img/wn/' + jsonObject.daily[i].weather[0].icon + '@2x.png';
          let imgalt = jsonObject.daily[i].weather[0].description;
          label.textContent = dayName;
          img.setAttribute('src', imageURL);
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

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // Pulled this from MDN docs for the next function
}

function advertisementUpdate() {
    const requestURL = "https://saraytin.github.io/vhchamber/json/businesses.json";
    fetch(requestURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (jsonObject) {
          // Picking three random businesses to advertise from my list of affiliated businesses
        let pick1 = 0;
        let pick2 = 0;
        let pick3 = 0;
        const len = jsonObject.business.length;
        pick1 = getRandomInt(0, len);
        do {
            pick2 = getRandomInt(0, len);
        }
        while (pick2 == pick1);
        do {
            pick3 = getRandomInt(0, len);
        }
        while (pick3 == pick1 || pick3 == pick2);
        // Run a for/if loop combo that picks up each of the businesses
        for (i = 0; i < len; i++) {
            if (i == pick1 || i == pick2 || i == pick3){
                // I'll be doing the same thing again on the business page so I split it into a separate function
                displayBusiness(jsonObject, i);
            }
        }
      });  
}

function businessUpdate() {
    const requestURL = "https://saraytin.github.io/vhchamber/json/businesses.json";
    fetch(requestURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (jsonObject) {
        for (i = 0; i < jsonObject.business.length; i++) {
            displayBusiness(jsonObject, i);
        }
      });  
}

function displayBusiness(jsonObject, i) {
    let card = document.createElement('section');
    let label = document.createElement('h4');
    let img = document.createElement('img');
    let address = document.createElement('p');
    let phone = document.createElement('p');
    let site = document.createElement('a');
    let name = jsonObject.business[i].name;
    label.textContent = name;
    address.textContent = jsonObject.business[i].address;
    phone.textContent = jsonObject.business[i].phone;
    site.textContent = "Website";
    let siteURL = jsonObject.business[i].site;
    site.setAttribute('href', siteURL);
    let imageURL = jsonObject.business[i].logo;
/*     img.setAttribute('src', phImage);
    img.setAttribute('data-src', imageURL); */
    img.setAttribute('src', imageURL);
    img.setAttribute('alt', "Logo for " + name);
    card.appendChild(label);
    card.appendChild(address);
    card.appendChild(phone);
    card.appendChild(site);
    card.appendChild(img);
    document.querySelector('div.businesses').appendChild(card);
}

function eventUpdate() {
    const requestURL = "https://saraytin.github.io/vhchamber/json/events.json";
    fetch(requestURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (jsonObject) {
          for (i = 0; i < jsonObject.event.length; i++) {
            let card = document.createElement('section');
            let label = document.createElement('h4');
            let img = document.createElement('img');
            let desc = document.createElement('p');
            let name = jsonObject.event[i].name;
            label.textContent = name;
            desc.textContent = jsonObject.event[i].description;
            let imageURL = jsonObject.event[i].image;
/*             img.setAttribute('src', phImage);
            img.setAttribute('data-src', imageURL); */
            img.setAttribute('src', imageURL);
            img.setAttribute('alt', "Image of " + name);
            card.appendChild(label);
            card.appendChild(desc);
            card.appendChild(img);
            // This is a bad solution but it's what I'm going with for now
            /* if (typeof jsonObject.event[i].vendors != "undefined") {
                let header = document.createElement('p');
                header.textContent = "Vendors:";
                card.appendChild(header);
                let vendors = document.createElement('ul');
                card.appendChild(vendors);
                for (v = 0; v < jsonObject.event[i].vendors; v++) {
                    let vendor = document.createElement('li');
                    vendor.textContent = jsonObject.event[i].vendors[v].name;
                    vendors.appendChild(vendor);
                }
            }
            else if (typeof jsonObject.event[i].speakers != "undefined") {
                let speakers = document.createElement('ul');
                for (s = 0; s < jsonObject.event[i].speakers; s++) {
                    let speaker = document.createElement('li');
                    speakers.appendChild(speaker);
                    let name = document.createElement('p');
                    let title = document.createElement('p');
                    let sDate = document.createElement('p');
                    let food = document.createElement('p');
                    name.textContent = "Speaker: " + jsonObject.event[i].speakers[s].name;
                    title.textContent = jsonObject.event[i].speakers[s].title;
                    sDate.textContent = jsonObject.event[i].speakers[s].date;
                    food.textContent = jsonObject.event[i].speakers[s].food;
                    speaker.appendChild(name);
                    speaker.appendChild(title);
                    speaker.appendChild(sDate);
                    speaker.appendChild(food);
                }
                card.appendChild(speakers);
            } */
            document.querySelector('div.events').appendChild(card);
          }
      });  
}

function boardUpdate() {
    const requestURL = "https://saraytin.github.io/vhchamber/json/board_of_directors.json";
    fetch(requestURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (jsonObject) {
        for (i = 0; i < jsonObject.leadership.person.length; i++) {
            let card = document.createElement('section');
            let label = document.createElement('h4');
            let img = document.createElement('img');
            let title = document.createElement('p');
            let name = jsonObject.leadership.person[i].name;
            label.textContent = name;
            title.textContent = jsonObject.leadership.person[i].position;
            let imageURL = jsonObject.leadership.person[i].image;
            img.setAttribute('src', imageURL);
            img.setAttribute('alt', "Picture of " + name);
            card.appendChild(label);
            card.appendChild(title);
            card.appendChild(img);
            document.querySelector('div.leadership').appendChild(card);
        }
        for (i = 0; i < jsonObject.vice_chairs.person.length; i++) {
            let card = document.createElement('section');
            let label = document.createElement('h4');
            let img = document.createElement('img');
            let title = document.createElement('p');
            let name = jsonObject.vice_chairs.person[i].name;
            label.textContent = name;
            title.textContent = jsonObject.vice_chairs.person[i].position;
            let imageURL = jsonObject.vice_chairs.person[i].image;
            img.setAttribute('src', imageURL);
            img.setAttribute('alt', "Picture of " + name);
            card.appendChild(label);
            card.appendChild(title);
            card.appendChild(img);
            document.querySelector('div.vicechairs').appendChild(card);
        }
        for (i = 0; i < jsonObject.board.person.length; i++) {
            let card = document.createElement('section');
            let label = document.createElement('h4');
            let img = document.createElement('img');
            let title = document.createElement('p');
            let name = jsonObject.board.person[i].name;
            label.textContent = name;
            title.textContent = jsonObject.board.person[i].position;
            let imageURL = jsonObject.board.person[i].image;
            img.setAttribute('src', imageURL);
            img.setAttribute('alt', "Picture of " + name);
            card.appendChild(label);
            card.appendChild(title);
            card.appendChild(img);
            document.querySelector('div.members').appendChild(card);
        }
      });  
}



function loadStuff() {
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
}