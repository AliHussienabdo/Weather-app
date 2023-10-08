import { 
    TodayInfo, 
    WeekInfo, 
    HourlyInfo, 
    generalInfo 
} from "./apis.js";


let tempDegree = 'temp_c';
let degree = 'C';

const location = document.getElementById('location');
const DateAndTime = document.getElementById('date-time');

const todayTemp = document.getElementById('today-temp');
const todayGeneralInfo = document.getElementById('today-general-info');
const hours = document.getElementById('hourly-info');

const week = document.getElementById('week-info');


function renderDom(){
    renderLocaionDateTime();
    renderToday();
    renderHours();
    renderForcast();
}


function getDateName(date = new Date(),options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }){
    return date.toLocaleDateString('en-US',options );    
}

function toggleTemp(){
    if(tempDegree === 'temp_c') {
        tempDegree = 'temp_f';
        degree = 'F';
    }
    else {
        tempDegree = 'temp_c';
        degree = 'C';
    }

    clearDom();
    renderDom();
}

function renderLocaionDateTime(){
    location.innerHTML = `${generalInfo.city}, ${generalInfo.country}`;
    let dayName = getDateName(new Date(generalInfo.localtime));
    DateAndTime.innerHTML = `${dayName}`;
}

function renderToday(){

    todayTemp.innerHTML = 
    `<img src="${TodayInfo.icon}"/>
    <p>${TodayInfo.condition}</p>
    <p>${TodayInfo[tempDegree]} <sup>o</sup>${degree} </p>`

    todayGeneralInfo.innerHTML = 
        `<div class="wind">Wind speed: ${TodayInfo.wind} km/h</div>
         <div class="humidity">Humidity: ${TodayInfo.humidity} %</div>
         <div class="rain">chance of Rain: ${TodayInfo.rain} %</div>
        `;
}

function renderHours(){

    HourlyInfo.forEach(hour => {
        hours.innerHTML +=
        `<div class="hour">
            <p>${hour.name}</p>
            <p>${hour.condition}</p>
            <img src="${hour.icon}">
            <p>${hour[tempDegree]}<sup>o</sup>${degree} </p>
        </div>`;
    })

}

function renderForcast(){

    WeekInfo.forEach(day => {
        week.innerHTML += 
        `<div class="day">
            <p>${getDateName(new Date(day.date), {weekday:'long'})}</p>
            <p>${day.condition}</p>
            <img src="${day.icon}">
            <p>${day[tempDegree]}<sup>o</sup> ${degree} </p>
        </div>`;
    })
}

function clearDom(){
    week.innerHTML = '';
    hours.innerHTML = '';
    todayTemp.innerHTML = '';
    todayGeneralInfo.innerHTML = '';
    location.innerHTML = '';
    DateAndTime.innerHTML = '';
}


export {renderDom, clearDom, toggleTemp};

