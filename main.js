window.addEventListener('load', countryFinder);

function countryFinder() {

    const countryDisplay = document.querySelector('.country__display')
    const countryList = 'https://restcountries.eu/rest/v2/all';
    let sortBtn = document.getElementById('sort');

    let div;
    let flagDiv;
    let countryflag;
    let countryName;
    let countryCapital;
    let countryPopulation;
    let countryRegion;
    let countryLanguage;
    let divArray = [];  
    

    fetch(countryList)
        .then(response => response.json())
        .then(countries => {

            document.getElementById('totalCountry').innerHTML = countries.length;
            
            createDiv(countries);

            sortBtn.addEventListener('click', () => {
                sortPopulation(countries)
            });

        })
    
        

    function createDiv(countries) {

        countries.forEach((item) => {

            div = document.createElement('div');
            flagDiv = document.createElement('div');
            countryflag = document.createElement('img');
            countryName = document.createElement('h3');
            countryCapital = document.createElement('p');
            countryPopulation = document.createElement('p');
            countryRegion = document.createElement('p');
            countryLanguage = document.createElement('p');
            
            
            div.classList.add('country__display-child');
            flagDiv.classList.add('country__display-imgDiv');
            countryName.classList.add('country__display-name');
            countryCapital.classList.add('country__display-capital');
            countryPopulation.classList.add('country__display-population')
            countryLanguage.classList.add('country__display-language');
            countryflag.classList.add('country__display-img');
            
            countryDisplay.append(div);
            div.appendChild(flagDiv);
            flagDiv.append(countryflag);
    
            div.append(countryName);
            div.append(countryCapital);
            div.append(countryPopulation);
            div.append(countryRegion);
            div.append(countryLanguage);
    
            countryName.innerHTML = item.name;
            countryCapital.innerHTML = '<b>Capital:</b> ' + item.capital;
            countryPopulation.innerHTML = '<b>Population:</b> ' + item.population;
            countryRegion.innerHTML = '<b>Region:</b> ' + item.region;              
            countryflag.src = item.flag;
            
    
            let languagesAll = [];
            item.languages.forEach(item => {
                languagesAll.push(item['name'])
            });

            countryLanguage.innerHTML = '<b>Language:</b> ' + languagesAll.toString();

            divArray.push(div);
            
        }); return divArray;
       
    }

    let searchBtn = document.getElementById('search'); 
        searchBtn.addEventListener('click', getCountry);
    let searchInput = document.querySelector('#keyword');
        searchInput.addEventListener('keyup', getCountry);

    
    let buttonStatus = '';

    let capitalSearch = document.getElementById('capital');
        capitalSearch.addEventListener('click', function() {
        buttonStatus = 'capital';
    })

    let languageSearch = document.getElementById('language')
        languageSearch.addEventListener('click', function() {
        buttonStatus = 'language';
    })

    
    let subTitle = document.querySelector('.subtitle');
    let countryDiv = document.getElementsByClassName('country__display-child');
    let capital = document.getElementsByClassName('country__display-capital');
    let language = document.getElementsByClassName('country__display-language');
    let population = document.getElementsByClassName('country__display-population');
  
    
    function getCountry() {

        clearForm()

        if (buttonStatus === 'capital') {
            getCountryCapital();
            
        } else if (buttonStatus === 'language') {
            getCountryLanguage();
            
        } else if (buttonStatus !== 'capital' && buttonStatus !== 'language') {
            subTitle.innerHTML = '<p>' + 'Please choose the search term first' + '</p>';
        }

    }


    function getCountryCapital() {

        for (let i = 0; i < countryDiv.length; i++) {

            countryDiv[i].style.display = 'none';

            if (capital[i].innerText.toUpperCase().indexOf(searchInput.value.toUpperCase()) === 9 ) {
                countryDiv[i].style.display = 'block';
            } else {
                countryDiv[i].style.display = 'none';
            }
        }
    }

    

    function getCountryLanguage() {

        for (let i = 0; i < countryDiv.length; i++) {
            
            countryDiv[i].style.display = 'none';
          
        let languageStr = language[i].innerText.slice(9);
        let languageArr = languageStr.split(',');

            languageArr.forEach((item) => {

                if (item.toUpperCase().startsWith(searchInput.value.toUpperCase()) === true) {
                    countryDiv[i].style.display = 'block';
                } else {
                    countryDiv[i].style.display = 'none';
                }

            })
        
        }
    }

    let sortStatus = false;
    sortBtn.addEventListener('click', () => {
        if (sortStatus === false) {
            sortStatus = true
        } else {
            sortStatus = false;
        }
        
    })

    function sortPopulation(countries) {  

        countryDisplay.innerHTML = "";

        if (sortStatus === true) {
            countries.sort( (a,b) => {
                return  b.population - a.population
                }
            )
        } else if (sortStatus === false) {
            countries.sort( (a,b) => {
                return  a.population - b.population
                }
            )
        }
        
        createDiv(countries);

    }

    
    function clearForm() {

        if (countryDiv.innerHTML !== "") {
            countryDiv.innerHTML === "";
        } 
    }

    searchInput.addEventListener('click', () => {
        if (searchInput.value !== '')
        searchInput.value === '';
    }) 


}