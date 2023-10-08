let generalInfo = {};
let TodayInfo = {};
let WeekInfo = [];
let HourlyInfo = [];

async function getLocation() {
  try {
    let response = await fetch(
      "https://api.geoapify.com/v1/ipinfo?apiKey=7027fd9accb146f2a3027aefdc0b563b"
    );
    response = await response.json();
    return response.city.name;

  } catch (err) {
    console.log(err);
  }
}

async function doFetch(location) {
  try {
    // location = location.replace(/\s/g,'');
    let response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=279b5151b6ee4b24a54184726230310&q=${location}&days=3&aqi=no&alerts=no`
    );
    response = await response.json();
    console.log(response)
    processJSON(response);
  } catch (err) {
    console.log(err);
  }
}

function processJSON(response) {
  const ForeCast = response.forecast.forecastday;
  const TodayForecast = ForeCast[0];

  TodayInfo = {
    temp_c: TodayForecast.day.avgtemp_c,
    temp_f: TodayForecast.day.avgtemp_f,
    wind: TodayForecast.day.maxwind_kph,
    humidity: TodayForecast.day.avghumidity,
    rain: TodayForecast.day.daily_chance_of_rain,
    icon: TodayForecast.day.condition.icon,
    condition: TodayForecast.day.condition.text
  };

  WeekInfo = [];
  ForeCast.forEach((now) =>{
    WeekInfo.push({
      date: now.date,
      temp_c: now.day.avgtemp_c,
      temp_f:now.day.avgtemp_f, 
      icon: now.day.condition.icon,
      condition: now.day.condition.text
    });
  }); 

  HourlyInfo = [];
  let hr = 0;
  TodayForecast.hour.forEach((hour) => {
    HourlyInfo.push({
      name: hr++,
      temp_c: hour.temp_c,
      temp_f: hour.temp_f, 
      icon: hour.condition.icon,
      condition: hour.condition.text
    });
  });

  generalInfo = {
    country: response.location.country, 
    city: response.location.name,
    date: TodayForecast.date,
    localtime: response.location.localtime,
    // localtime_epoch: response.location.localtime.localtime_epoch
  }

}

export { 
    TodayInfo, 
    WeekInfo, 
    HourlyInfo, 
    generalInfo, 
    getLocation, 
    doFetch 
};
