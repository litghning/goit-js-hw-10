import  './css/styles.css';
import { fetchCountries } from './fetchCountries';
import { tooManyResultsCountryAlert, countryNotFoundAlert } from './alert';
import { markupPreview, searchedCountryFoundMarkup } from './markup';


const refs = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};
const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

refs.input.addEventListener('input', debounce(onSearchCountry, DEBOUNCE_DELAY));

function onSearchCountry(evt) {
  const countryName = evt.target.value.trim();

  if (countryName === '') {
    return resMarkup();
  }

  fetchCountries(countryName)
    .then(country => {
      resMarkup();

      if (country.length === 1) {
        renderCountryData('countryInfo', searchedCountryFoundMarkup, country);
      } else if (country.length >= 15) {
        tooManyResultsCountryAlert();
      } else {
        renderCountryData('countryList', markupPreview, country);
      }
    })
    .catch(countryNotFoundAlert);
}

function resMarkup() {
  refs.countryInfo.innerHTML = ' ';
  refs.countryList.innerHTML = ' ';
}

function renderCountryData(position, render, country) {
  refs[position].insertAdjacentHTML('beforeend', render(country));
}
