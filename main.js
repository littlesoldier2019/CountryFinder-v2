window.addEventListener('load', countryFinder);
function countryFinder() {

    const countryDisplay = document.querySelector('.country__display')
    const countryList = 'https://restcountries.eu/rest/v2/all';
    fetch(countryList)
        .then(response => response.json())
        .then(countries => {
            for (const country of countries) {

                console.log(country)
                
                let {
                    name,
                    capital,
                    population,
                    region,
                    languages,
                    flag,
                    topLevelDomain: domain
                } = country;

                let div = document.createElement('div');
                let countryflag = document.createElement('img');
                let countryName = document.createElement('h3');
                let countryCapital = document.createElement('p');
                let countryPopulation = document.createElement('p');
                let countryRegion = document.createElement('p');
                let countryLanguage = document.createElement('p');
                
                countryName.textContent = name;
                countryCapital.textContent = 'Capital: ' + capital;
                countryPopulation.textContent = 'Population: ' + population;
                countryRegion.textContent = 'Region: ' + region;
                countryLanguage.textContent = 'Language: ' + languages[0]['name'];

                countryflag.src = flag;

                div.classList.add('country__display-child');
                
                countryDisplay.append(div);

                div.appendChild(countryflag);
                div.appendChild(countryName);
                div.appendChild(countryCapital);
                div.appendChild(countryPopulation);
                div.appendChild(countryRegion);
                div.appendChild(countryLanguage);

                countryflag.style.width = '14rem';
                countryflag.style.height = '10rem';
                
            }
        })

}