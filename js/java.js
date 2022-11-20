let myInput=document.querySelector('.my-input');
let myShow=document.querySelector('.my-show');
let myWeather=document.querySelector('.weather');

let date=new Date();
const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
let myday=weekday[date.getDay()];


myShow.addEventListener('submit',(e)=>{
    e.preventDefault();
let region=myInput.value;

    fetch(`https://weatherdbi.herokuapp.com/data/weather/${region}`)
.then((res)=>res.json())
.then((data)=>{
    // console.log(data)
let weatherData=`
<h2 class="lh-base text-center mt-2 arround col-lg-12 py-2 shadow justify-content-evenly">
Day: ${data.currentConditions.dayhour}<span class="mx-3"></span> Wind speed: ${data.currentConditions.wind.km} KM - ${data.currentConditions.wind.mile} Mile <br>
Temprature: ${data.currentConditions.temp.c}°C - ${data.currentConditions.temp.f}°F 
<img src="${data.currentConditions.iconURL}"> ${data.currentConditions.comment}
</h2>
`
myWeather.innerHTML=weatherData;

for(let i=date.getDay()+1;i<weekday.length;i++){

// console.log(data.next_days.filter((v)=>{return v.day==weekday[i]}).map((m)=>{return m.day}))
let weatherData2=`
<h2 class="lh-base text-center mt-2 arround col-12 py-2 shadow justify-content-evenly">
Day: ${data.next_days.filter((v)=>{return v.day==weekday[i]}).map((m)=>{return m.day})} <span class="mx-3"></span> 
Max-temprature: ${data.next_days.filter((v)=>{return v.day==weekday[i]}).map((m)=>{return m.max_temp.c})}°C - ${data.next_days.filter((v)=>{return v.day==weekday[i]}).map((m)=>{return m.max_temp.f})}°F <br>
Min-temprature: ${data.next_days.filter((v)=>{return v.day==weekday[i]}).map((m)=>{return m.min_temp.c})}°C - ${data.next_days.filter((v)=>{return v.day==weekday[i]}).map((m)=>{return m.min_temp.f})}°F 
<img src="${data.next_days.filter((v)=>{return v.day==weekday[i]}).map((m)=>{return m.iconURL})}"> ${data.next_days.filter((v)=>{return v.day==weekday[i]}).map((m)=>{return m.comment})}
</h2>
`
myWeather.innerHTML+=weatherData2;
}

})

myInput.value="";

})
