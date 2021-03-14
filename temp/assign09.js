function showCities() {
    var xhttp = new XMLHttpRequest();
    var filename = document.getElementsByName("country")[0].value + ".txt";
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById('cities').innerHTML = "";
            var cities = this.responseText;
            var formattedCities = cities.split(RegExp(/\n/));
            for (i = 0; i< formattedCities.length; i++) {
                var card = document.createElement('section');
                var p = document.createElement('p');
                p.textContent = formattedCities[i];
                card.appendChild(p);
                /* var text = formattedCities.split(RegExp(/\s{2,}/));
                for (i = 0; i< text.length; i++) {
                    var tr = document.createElement('tr');
                    var td = document.createElement('td');
                    td.textContent = text[i];
                    tr.appendChild(td);
                    card.appendChild(tr);
                } */
                document.querySelector('div#cities').appendChild(card);
            }
        }
    };
    xhttp.open("GET", filename, true);
    xhttp.send();    
}

function showStudents() {
    var xhttp = new XMLHttpRequest();
    var filename = document.getElementsByName("input_path")[0].value;
    document.getElementById('students').innerHTML = "";
    xhttp.onreadystatechange = function() {
        console.log(this.readyState);
        console.log(this.status);
        if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);
            const data = myArr['students'];
            console.log(data);
            for (let i = 0; i < data.length; i++ ) {
                let card = document.createElement('section');
                let h2 = document.createElement('h2');
                let address = document.createElement('p');
                let major = document.createElement('p');
                let gpa = document.createElement('p');
            
                h2.textContent = data[i].first + ' ' + data[i].last;
                address.textContent = "Address: " + data[i].address.city + ", " + data[i].address.state + " " + data[i].address.zip;
                major.textContent = 'Major: ' + data[i].major;
                gpa.textContent = 'GPA: ' + data[i].gpa;

                card.appendChild(h2);
                card.appendChild(address);
                card.appendChild(major);
                card.appendChild(gpa);
                document.querySelector('div#students').appendChild(card);
            }
        }
        else if (this.status == 404) {
            document.getElementById('students').innerHTML = "File could not be found.";
        }
    };
    xhttp.open("GET", filename, true);
    xhttp.send();    
}