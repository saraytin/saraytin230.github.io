var date = new Date();
var day = [" Sunday", " Monday", "Tuesday", " Wednesday", " Thursday", "Friday", " Saturday"];
var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

document.getElementById("date").innerHTML = day[date.getDay()] +
", " + date.getDate() + " " + month[date.getMonth()] + " " +
date.getFullYear();

document.getElementById("year").innerHTML = date.getFullYear();

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