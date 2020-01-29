window.addEventListener('load', countryFinder);

function countryFinder() {

    const countryDisplay = document.querySelector('.country__display')
    const countryList = 'https://restcountries.eu/rest/v2/all';

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
            flagDiv = document.createElement('div');
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
            flagDiv.classList.add('country__display-imgDiv');
            countryName.classList.add('country__display-name');
            countryflag.classList.add('country__display-img');
            
            countryDisplay.append(div);
            div.appendChild(flagDiv);
            flagDiv.append(countryflag);

            div.appendChild(countryName);
            div.appendChild(countryCapital);
            div.appendChild(countryPopulation);
            div.appendChild(countryRegion);
            div.appendChild(countryLanguage);

            divArray.push(div);

            
        }


    })
    
        let sortButton = document.getElementById('sort');
            sortButton.addEventListener('click', function() {
            countryDisplay.innerHTML = "";
            
            divArray.reverse();

            for (let i = 0; i < divArray.length; i++) {
                countryDisplay.appendChild(divArray[i]);
                console.log(divArray[i]);
            }
        
            
        });

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
    searchInput.addEventListener('keyup', findCountry);

    function findCountry() {
        clearForm();
        if (buttonStatus === 'start') {
            getCountryStart();
            subTitle.innerHTML = '<p>' + 'Number of countries <b>start</b> with ' + '"' + searchInput.value + '"' + ' is ' + resultNum.length + '</p>';
        } else if (buttonStatus === 'contain') {
            getCountryContain();
            subTitle.innerHTML = '<p>' + 'Number of countries <b>contain</b> ' + '"' + searchInput.value + '"' + ' is ' + resultNum.length + '</p>';
        } else if (buttonStatus !== 'start' && buttonStatus !== 'contain') {
            subTitle.innerHTML = '<p>' + 'Please choose the search term first' + '</p>';
        }
    }
 
    
    // startSearch.addEventListener('click', getCountryStart);
    let resultNum = [];

    function getCountryStart() {
        for (let i = 0; i < countryDiv.length; i++) {
            countryDiv[i].style.display = 'none';
            
            if (countryH3[i].innerHTML.startsWith(searchInput.value.toUpperCase()) === true ) {
                countryDiv[i].style.display = 'block';
                resultNum.push(countryDiv[i]);
            } else {
                countryDiv[i].style.display = 'none';
            }

        }
        
        console.log(searchInput.value);
    
    }


    // containSearch.addEventListener('click', getCountryContain);

    function getCountryContain() {

        for (let i = 0; i < countryDiv.length; i++) {
            countryDiv[i].style.display = 'none';

            if (countryH3[i].innerHTML.includes(searchInput.valuetoUpperCase()) === true ) {
                countryDiv[i].style.display = 'block';
                resultNum.push(countryDiv[i]);
            } else {
                countryDiv[i].style.display = 'none';
            }
           
        }
    
    }

    function clearForm() {
        if (countryDiv.innerHTML !== "" || resultNum.length !== 0) {
            countryDiv.innerHTML === "";
            resultNum = [];
        }
    }
 
    
}

// time slap input keyword
// reverse the whole country