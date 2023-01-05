let searchBtn = document.getElementById("search-btn");
let countryInp = document.getElementById("country-inp");
let getWeather = () => {
  let countryName = countryInp.value;
  let finalURL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
  console.log(finalURL);
  fetch(finalURL)
    .then((response) => response.json())
    .then((data) => {
   
      result.innerHTML = `
        <img src="${data[0].flags.svg}" class="flag-img">
     
        <div class="wrapper">
            <div class="data-wrapper">
                <h4>${data[0].name.common}'nin Başkent:</h4>
                <span>${data[0].capital[0]}</span>
            </div>
        </div>
        <div class="wrapper">
            <div class="data-wrapper">
                <h4>${data[0].name.common}'nin Kıtası:</h4>
                <span>${data[0].continents[0]}</span>
            </div>
        </div>
         <div class="wrapper">
            <div class="data-wrapper">
                <h4>${data[0].name.common}'nin Nüfus Sayısı:</h4>
                <span>${data[0].population}</span>
            </div>
        </div>
        <div class="wrapper">
            <div class="data-wrapper">
                <h4>${data[0].name.common}'nin Para Birimi:</h4>
                <span>${
                  data[0].currencies[Object.keys(data[0].currencies)].name
                } - ${Object.keys(data[0].currencies)[0]}</span>
            </div>
        </div>
         <div class="wrapper">
            <div class="data-wrapper">
                <h4>${data[0].name.common}'nin Ana Dili:</h4>
                <span>${Object.values(data[0].languages)
                  .toString()
                  .split(",")
                  .join(", ")}</span>
            </div>
        </div>

        <div class="wrapper">
        <div class="data-wrapper">
            <h4>${data[0].name.common}'nin Komşu Ülkeri:</h4>
           <span> ${data[0].borders}</span>
    </div>

   



        
      `;
    })
    .catch(() => {
      if (countryName.length == 0) {
        result.innerHTML = `<h3>Lütfen ülke adı giriniz</h3>`;
      } else {
        result.innerHTML = `<h3>Girdiniz ülke bulunamadı</h3>`;
      }
    });
};
window.addEventListener("load", getWeather);
searchBtn.addEventListener("click", getWeather);