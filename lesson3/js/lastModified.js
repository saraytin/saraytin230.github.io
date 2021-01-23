var lastModified = document.lastModified;
document.getElementById("date").innerHTML = "Last Updated on " + lastModified;
document.getElementById("year").innerHTML = new Date().getFullYear();