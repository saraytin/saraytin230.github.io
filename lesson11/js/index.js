homePage();

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
            /* console.log(towns[i].events); */
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