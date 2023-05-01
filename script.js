const place = document.querySelector('.place');
const week_day = document.querySelector('.week-day');
const current_temperature=document.querySelector('.current-temperature');
const weather_temperatures=document.querySelectorAll('.time-weather-temperature');
const percent_chance_of_rain=document.querySelector('.percent-chance-of-rain');
const percent_humidity=document.querySelector('.percent-humidity');
const value_wind_speed=document.querySelector('.value-wind-speed');
const value_visibility=document.querySelector('.value-visibility');
const value_pressure=document.querySelector('.value-pressure');
const day_info = document.querySelector('.day_info');
const weather_search= document.querySelector('.weather-search');
const button_search= document.querySelector('.button-search');
const temp_choose=document.querySelector('.temp-choose');


const API_KEY = "b00a32cc3bbabba171797ef61de7cf5f";

const get_weather = async (city)=>{
    const API = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    const res=await (await fetch(API)).json();
    console.log(res);
    place.innerHTML=city;
    week_day.innerHTML=Date(res.dt).split(' ')[0];
    current_temperature.innerHTML=Number(res.main.temp).toFixed(0) + "° C";
    weather_temperatures[0].innerHTML=Number(res.main.temp_min).toFixed(0) + "° C";
    weather_temperatures[1].innerHTML=Number((res.main.temp_min+res.main.temp_max)/2).toFixed(0) + "° C";
    weather_temperatures[2].innerHTML=Number(res.main.temp_max).toFixed(0) + "° C";
    weather_temperatures[3].innerHTML=Number(res.main.temp_min).toFixed(0) + "° C";
    console.log(res.rain)
    percent_humidity.innerHTML=res.main.humidity+"%";
    value_wind_speed.innerHTML=(Number(res.wind.speed)*3.6).toFixed(1) + "km/h";
    value_visibility.innerHTML=(Number(res.visibility)/1000).toFixed(0)+"km";
    value_pressure.innerHTML=res.main.pressure + "hPa";

    const API_4DAY=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;

    const days=await(await fetch(API_4DAY)).json();
    console.log(days.list)
    let current_day=2;
    while(current_day+8<=days.list.length) {
        let d= String(new Date(days.list[current_day].dt_txt.split(' ')[0]));
        console.log(d);
        const day=`
                <div class="day_general-index  border-bottom no-center">${d.split(' ')[0]}</div>
                <div class="day day_general-chance_of_rain  border-bottom">${days.list[current_day].main.humidity}%</div>
                <div class="day day_general-humidity  border-bottom">${days.list[current_day].main.humidity}%</div>
                <div class="day day_general-wind  border-bottom">${days.list[current_day].wind.speed} km/h</div>
                <div class="day day_general-temperature  border-bottom">${Number(days.list[current_day].main.temp).toFixed(0)} ° C</div> `
        day_info.innerHTML+=day;
        current_day+=8;
    }


}

weather_search.addEventListener('keyup', function(event){
    if (event.key === 'Enter') {
        button_search.click();
    }
})
button_search.addEventListener('click',async ()=>{
    const city=weather_search.value;
    await get_weather(city);
    weather_search.value="";
})



