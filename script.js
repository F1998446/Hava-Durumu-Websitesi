let result = document.getElementById("result");
let searchBtn = document.getElementById("search-btn");
let cityRef = document.getElementById("city");

window.addEventListener("load",()=>{
  if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position)=>{
          let lon= position.coords.longitude;
          let lat= position.coords.latitude;
          const url= `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&` + `lon=${lon}&appid=${apikey}`;
          

          fetch(url).then((res)=>{
              return res.json();
          }).then((data)=>{
              console.log(data);
              console.log(new Date().getTime())
              var dat= new Date(data.dt)
              console.log(dat.toLocaleString(undefined,'Asia/Kolkata'))
              console.log(new Date().getMinutes())
              weatherReport(data);
          })
      })
  }
})



//Function to fetch weather details from api and display them
let getWeather = () => {
  let cityValue = cityRef.value;
  //If input field is empty
  if (cityValue.length == 0) {
    result.innerHTML = `<h3 class="msg">Lütfen şehir adi giriniz</h3>`;
  }
  //If input field is NOT empty
  else {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=99506ab6d5a366010066f30901d38db4&units=metric`;
    //Clear the input field
    cityRef.value = "";
    fetch(url)
      .then((resp) => resp.json())
      //If city name is valid
      .then((data) => {
        console.log(data);
        console.log(data.weather[0].icon);
        console.log(data.weather[0].main);
        console.log(data.weather[0].description);
        console.log(data.name);
        console.log(data.main.temp_min);
        console.log(data.main.temp_max);

        var zaman1= data.dt;
        var zaman= new Date(zaman1 * 1000).toLocaleString();
         const date = new Date(zaman1 * 1000);
         const hours = date.getHours();
         const minutes = date.getMinutes();
         const seconds = date.getSeconds();
         const time = `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(seconds,)}`;
   
         const year = date.getFullYear();
         const month = padTo2Digits(date.getMonth() + 1);
         const day = padTo2Digits(date.getDate());
         const dateTime = `${year}-${month}-${day}`;
         const zaman2= `${time}`;
 
       function padTo2Digits(num) {
            return num.toString().padStart(2, '0');
          }
        result.innerHTML = `
        <h2>${data.name},${data.sys.country}</h2>
        <h4 class="weather">${data.weather[0].main}</h4>
        <h4 class="desc">${data.weather[0].description}</h4>
        <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png">
        <h1>${data.main.temp} &#176;</h1>
        <div class="temp-container">
            <div>
                <h4 class="title">min</h4>
                <h4 class="temp">${data.main.temp_min}&#176;</h4>
            </div>
            <div>
                <h4 class="title">max</h4>
                <h4 class="temp">${data.main.temp_max}&#176;</h4>
            </div>

           <div> 
           
           <h4 class="title">${dateTime}</h4>
           <h4 class="title">${zaman2}</h4>
           </div>
        </div>
        `;
      })
      //If city name is NOT valid
      .catch(() => {
        result.innerHTML = `<h3 class="msg">Böyle şehir bulunamadi</h3>`;
      });
  }
};
searchBtn.addEventListener("click", getWeather);
window.addEventListener("load", getWeather);


function hourForecast(forecast){
  document.querySelector('.templist').innerHTML=''
  for (let i = 0; i < 5; i++) {

      var date= new Date(forecast.list[i].dt*1000)
      console.log((date.toLocaleTimeString(undefined,'Asia/Kolkata')).replace(':00',''))

      let hourR=document.createElement('div');
      hourR.setAttribute('class','next');

      let div= document.createElement('div');
      let time= document.createElement('p');
      time.setAttribute('class','time')
      time.innerText= (date.toLocaleTimeString(undefined,'Asia/Kolkata')).replace(':00','');

      let temp= document.createElement('p');
      temp.innerText= Math.floor((forecast.list[i].main.temp_max - 273))+ ' °C' + ' / ' + Math.floor((forecast.list[i].main.temp_min - 273))+ ' °C';

      div.appendChild(time)
      div.appendChild(temp)

      let desc= document.createElement('p');
      desc.setAttribute('class','desc')
      desc.innerText= forecast.list[i].weather[0].description;

      hourR.appendChild(div);
      hourR.appendChild(desc)
      document.querySelector('.templist').appendChild(hourR);
  }
}

function dayForecast(forecast){
  document.querySelector('.weekF').innerHTML=''
  for (let i = 8; i < forecast.list.length; i+=8) {
      console.log(forecast.list[i]);
      let div= document.createElement('div');
      div.setAttribute('class','dayF');
      
      let day= document.createElement('p');
      day.setAttribute('class','date')
      day.innerText= new Date(forecast.list[i].dt*1000).toDateString(undefined,'Asia/Kolkata');
      div.appendChild(day);

      let temp= document.createElement('p');
      temp.innerText= Math.floor((forecast.list[i].main.temp_max - 273))+ ' °C' + ' / ' + Math.floor((forecast.list[i].main.temp_min - 273))+ ' °C';
      div.appendChild(temp)

      let description= document.createElement('p');
      description.setAttribute('class','desc')
      description.innerText= forecast.list[i].weather[0].description;
      div.appendChild(description);

      document.querySelector('.weekF').appendChild(div)
  }
} 
