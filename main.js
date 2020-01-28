window.addEventListener('load', countryFinder);

function countryFinder() {

    const countryDisplay = document.querySelector('.country__display')
    const countryList = 'https://restcountries.eu/rest/v2/all';

    let div;
    let countryflag;
    let countryName;
    let countryCapital;
    let countryPopulation;
    let countryRegion;
    let countryLanguage;
    
    
    fetch(countryList)
        .then(response => response.json())
        .then(countries => {

            console.log(countries.length);
            document.getElementById('totalCountry').innerHTML = countries.length;
    
            for (const country of countries) {

                let {
                    name,
                    capital,
                    population,
                    region,
                    languages,
                    flag,
                } = country;   
                

                div = document.createElement('div');
                countryflag = document.createElement('img');
                countryName = document.createElement('h3');
                countryCapital = document.createElement('p');
                countryPopulation = document.createElement('p');
                countryRegion = document.createElement('p');
                countryLanguage = document.createElement('p');
                
                countryName.innerHTML = name;
                countryCapital.innerHTML = '<b>Capital:</b> ' + capital;
                countryPopulation.innerHTML = '<b>Population:</b> ' + population;
                countryRegion.innerHTML = '<b>Region:</b> ' + region;
                countryLanguage.innerHTML = '<b>Language:</b> ' + languages[0]['name'];
        
                countryflag.src = flag;
        
                div.classList.add('country__display-child');
                countryName.classList.add('country__display-name');
                countryflag.classList.add('country__display-img');
                
                countryDisplay.append(div);
        
                div.appendChild(countryflag);
                div.appendChild(countryName);
                div.appendChild(countryCapital);
                div.appendChild(countryPopulation);
                div.appendChild(countryRegion);
                div.appendChild(countryLanguage);            
                
            }
        })
    
    

    let startSearch = document.querySelector('#start-word');
    let containSearch = document.querySelector('#contain-word');
    let search = document.querySelector('#search');
    let subTitle = document.querySelector('.subtitle');
    let countryDiv = document.getElementsByClassName('country__display-child');
    let countryH3= document.getElementsByClassName('country__display-name');
    let searchInput = document.querySelector('#keyword');

   
    let buttonStatus;
    startSearch.addEventListener('click', function() {
            buttonStatus = 'start';
        })
    containSearch.addEventListener('click', function() {
            buttonStatus = 'contain';
        })
    

    search.addEventListener('click', findCountry);
    function findCountry() {

        if (buttonStatus === 'start') {
            subTitle.innerHTML = '<p>' + 'There are countries <b>start</b> with ' + searchInput.value + '</p>';
            getCountryStart();
        } else if (buttonStatus === 'contain') {
            subTitle.innerHTML = '<p>' + 'There are countries <b>contain</b> ' + searchInput.value + '</p>';
            getCountryContain();
        } else if (buttonStatus !== 'start' && buttonStatus !== 'contain') {
            subTitle.innerHTML = '<p>' + 'Please choose the search term first' + '</p>';
        }
    }
 
    
    // startSearch.addEventListener('click', getCountryStart);

    function getCountryStart() {
        for (let i = 0; i < countryDiv.length; i++) {
            countryDiv[i].style.display = 'none';

            if (countryH3[i].innerHTML.startsWith(searchInput.value) === true ) {
                countryDiv[i].style.display = 'block';
            } else {
                countryDiv[i].style.display = 'none';
            }

            console.log(countryH3[i].innerHTML.startsWith(searchInput.value));
        }
    
    }



    // containSearch.addEventListener('click', getCountryContain);

    function getCountryContain() {

        for (let i = 0; i < countryDiv.length; i++) {
            countryDiv[i].style.display = 'none';

            if (countryH3[i].innerHTML.includes(searchInput.value) === true ) {
                countryDiv[i].style.display = 'block';
            } else {
                countryDiv[i].style.display = 'none';
            }

            console.log(countryH3[i].innerHTML.includes(searchInput.value));
        }
    
    }

}