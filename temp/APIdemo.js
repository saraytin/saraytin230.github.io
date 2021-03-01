function getSign() {

	var sign = document.getElementById("sign").value;
	var day = document.getElementById("day").value;
	var requestURL = "https://sameer-kumar-aztro-v1.p.rapidapi.com/?sign=" + sign + "&day=" + day;

	fetch(requestURL, {
		"method": "POST",
		"headers": {
			"x-rapidapi-key": "83a512d324msh953d832c8f94c99p171234jsn4498beefb811",
			"x-rapidapi-host": "sameer-kumar-aztro-v1.p.rapidapi.com"
		}
	})
	.then(function (response) {
		return response.json();
	})
	.then(function (jsonObject) {
		console.table(jsonObject);
		const horoscope = jsonObject;
		let results = document.createElement('section');
		let h3 = document.createElement('h3');
		let p1 = document.createElement('p');
		let p2 = document.createElement('p');
		let p3 = document.createElement('p');
		let p4 = document.createElement('p');
		let p5 = document.createElement('p');
		let p6 = document.createElement('p');
		let p7 = document.createElement('p');

		const nameCapitalized = sign.charAt(0).toUpperCase() + sign.slice(1)
		h3.textContent = nameCapitalized + ' - ' + horoscope.current_date;
		p1.textContent = 'For: ' + horoscope.date_range;
		p2.textContent = 'Compatible with: ' + horoscope.compatibility;
		p3.textContent = 'Mood: ' + horoscope.mood;
		p4.textContent = 'Lucky Color: ' + horoscope.color;
		p5.textContent = 'Lucky Number: ' + horoscope.lucky_number;
		p6.textContent = 'Lucky Time: ' + horoscope.lucky_time;
		p7.textContent = 'Further details: ' + horoscope.description;

		results.appendChild(h3);
		results.appendChild(p1);
		results.appendChild(p2);
		results.appendChild(p3);
		results.appendChild(p4);
		results.appendChild(p5);
		results.appendChild(p6);
		results.appendChild(p7);
		document.querySelector('div.results').appendChild(results);
	});
}