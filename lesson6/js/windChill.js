
let temp = parseFloat(document.getElementById("currentTemp").textContent);
let speed = parseFloat(document.getElementById("windSpeed").textContent);
 
if (temp <= 50 && speed >= 3)  {
  document.getElementById('chillTemp').innerHTML = windChill(temp,speed)+'&#8457;';
}
else {
  document.getElementById("chillTemp").innerHTML = "N/A";
}

function windChill(t,s) {
  let w = Math.round(35.74 + 0.6215 * t - 35.75 * Math.pow(s, 0.16) + 0.4275 * t * Math.pow(s, 0.16));
return w;
}
