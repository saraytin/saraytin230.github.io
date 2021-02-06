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