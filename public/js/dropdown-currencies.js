import {country_list} from "./country-list.js"
const dropList = document.querySelectorAll(".currency-select-menu");
let conversionRates = {};

for (const selectMenu of dropList) {
      for (const countryName in country_list){
            const option = document.createElement("option");
            option.textContent = countryName;
            option.value = countryName;
            selectMenu.append(option);
      }
}

async function onFromCurrencyChange(){
      const currency = document.querySelector("#from-currency").value;
      const response = await fetch(`/rate/${currency}`);
      const apiData = await response.json();
      conversionRates = apiData.conversion_rates;
      updateExchangeRate("from");
}

function updateExchangeRate(boxName){
      const toCurrency = document.querySelector("#to-currency").value;
      const rate = conversionRates[toCurrency];
      const fromCurrency = document.querySelector("#from-currency").value;
      document.querySelector(`#exchange-rate`).textContent = `1 ${fromCurrency} = ${rate} ${toCurrency}`;
      document.querySelector('#from-currency-span').textContent = fromCurrency;
      document.querySelector('#to-currency-span').textContent = toCurrency;
      if (boxName === "from"){
            const amountOfFromCurrency = document.querySelector(`#from-currency-input`).value;
            const amountOfToCurrency = amountOfFromCurrency * rate;
            document.querySelector(`#to-currency-input`).value = amountOfToCurrency.toFixed(2);
      }
      else{
            const amountOfToCurrency = document.querySelector(`#to-currency-input`).value;
            const amountOfFromCurrency = amountOfToCurrency / rate;
            document.querySelector(`#from-currency-input`).value = amountOfFromCurrency.toFixed(2);
      }
}

async function swapCurrencies(){
      const toCurrency = document.querySelector("#to-currency").value;
      const fromCurrency = document.querySelector("#from-currency").value;
      document.querySelector("#from-currency").value = toCurrency;
      document.querySelector("#to-currency").value = fromCurrency;
      await onFromCurrencyChange();
}

document.querySelector("#from-currency").addEventListener("change", () => {
      onFromCurrencyChange();
})

document.querySelector("#to-currency").addEventListener("change", () => {
      updateExchangeRate("from");
})

document.querySelector("#from-currency-input").addEventListener("input", () => {
      updateExchangeRate("from");
})

document.querySelector("#to-currency-input").addEventListener("input", () => {
      updateExchangeRate("to");
})

document.querySelector("#swap-currency-button").addEventListener("click", () => {
      swapCurrencies();
})

onFromCurrencyChange();