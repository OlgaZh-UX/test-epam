'use strict';
let city = 'Самара';
let now = new Date();
let newDay = new Date();
let today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).valueOf();

//В датах указаны подряд 5 дней начиная от вчера
const weather = [
    {
      date: newDay.setDate(newDay.getDate() - 1),
      temperature: {
        night: 16,
        day: 26,
      },
      cloudiness: 'Ясно',
      snow: false,
      rain: false,
    },
    {
      date: newDay.setDate(newDay.getDate() + 1),
      temperature: {
        night: 19,
        day: 29,
      },
      cloudiness: 'Облачно',
      snow: false,
      rain: true,
    },
    {
      date: newDay.setDate(newDay.getDate() + 1),
      temperature: {
        night: 12,
        day: 21,
      },
      cloudiness: 'Облачно',
      snow: true,
      rain: true,
    },
    {
      date: newDay.setDate(newDay.getDate() + 1),
      temperature: {
        night: 16,
        day: 26,
      },
      cloudiness: 'Ясно',
      snow: false,
      rain: false,
    },
    {
      date: newDay.setDate(newDay.getDate() + 1),
      temperature: {
        night: 16,
        day: 26,
      },
      cloudiness: 'Ясно',
      snow: false,
      rain: true,
    },
    {
      date: newDay.setDate(newDay.getDate() + 1),
      temperature: {
        night: 16,
        day: 26,
      },
      cloudiness: 'Ясно',
      snow: false,
      rain: false,
    },
  ]
class DayWeather {
    constructor (item) {
        this.date = item.date;        
        this.temperatureDay = item.temperature.day;
        this.temperatureNight = item.temperature.night;
        this.cloudiness = item.cloudiness;
        this.snow = item.snow;
        this.rain = item.rain;
    }
    get getDayTemp() {
        if (this.temperatureDay > 0) 
            return 'днем +' + this.temperatureDay;
        else 
            return 'днем -' + this.temperatureDay;            
    }
    get getNightTemp() {
        if (this.temperatureNight > 0) 
            return 'ночью +' + this.temperatureNight;
        else 
            return 'ночью -' + this.temperatureNight;
    }
    //возвращает ссылку на изображение в зависимости от облачности, дождя и снега
    get getIcon() {
      let icon = 'images/cloud.svg';     
      if (this.cloudiness == 'Ясно' && this.snow && this.rain) {// ясно - снег - дождь        
        icon = 'images/cloud.svg';
      }
      if (this.cloudiness == 'Ясно' && !this.snow && this.rain) { //ясно - дождь       
        icon = 'images/cloud-sun-rain.svg';
      }
      if (this.cloudiness == 'Ясно' && this.snow && !this.rain) {//ясно - снег        
        icon = 'images/cloud-sun-rain.svg';
      }
      if (this.cloudiness == 'Ясно' && !this.snow && !this.rain) {//ясно        
        icon = 'images/sun.svg'
      }
      if (this.cloudiness == 'Облачно' && this.snow && this.rain) {// облачно - снег - дождь        
        icon = 'images/rain-snow.svg';
      }
      if (this.cloudiness == 'Облачно' && !this.snow && this.rain) {//облачно - дождь        
        icon = 'images/rain.svg';
      }
      if (this.cloudiness == 'Облачно' && this.snow && !this.rain) {//облачно - снег        
        icon = 'images/snow.svg';
      }
      if (this.cloudiness == 'Облачно' && !this.snow && !this.rain) {//облачно        
        icon = 'images/cloud.svg'
      }
      return icon;
    }
    //возвращает информацию об осадках
    get precipitation () {
        if (this.snow && this.rain) 
            return 'снег с дождем';
        if (!this.snow && !this.rain)
            return 'без осадков';
        if (this.snow && !this.rain)
            return 'снег';
        if (!this.snow && this.rain)
            return 'дождь';
    }
}
//определяет день и месяц
let getDateDay = function(date) {
  let month = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
  let d = new Date(date);
  return d.getDate() + ' ' + month[d.getMonth()];
}
//определяет день недели, если второй параметр true, то для текущего дня укажет 'сегодня'
let getDayWeek = function(date, isToday) {
  if (isToday) {    
    let day = new Date(date).setHours(0, 0, 0, 0);
    if (day.valueOf() == today) {
      return 'сегодня';
    }
  }
  let days = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота']; 
  let d = new Date(date);  
  return days[d.getDay()];
}
//создает элементы на странице по указанному тегу, классу и добавляет контент
let makeElement = function (tagName, className, text) {
    let element = document.createElement(tagName);
    element.classList.add(className);
    if (text) {
      element.textContent = text;
    }
    return element;
  };
//создает элемент day в разметке html
let createDay = function(element) {
  let day = makeElement('div','weather-day');
  let dayWeek = makeElement('span','day-week', getDayWeek(element.date, true));
  day.appendChild(dayWeek);
  let date = makeElement('h2', 'day-date', getDateDay(element.date));
  day.appendChild(date);
  let icon = makeElement('img', 'day-icon');
  icon.src = element.getIcon;  
  day.appendChild(icon);  
  let dayT = makeElement('span', 'day-temper', element.getDayTemp);
  day.appendChild(dayT);
  let nightT = makeElement('span', 'day-temper-night', element.getNightTemp);
  day.appendChild(nightT);
  let cloud = makeElement('span', 'day-info', element.cloudiness + ',');
  day.appendChild(cloud);
  let precip = makeElement('span', 'day-info', element.precipitation);
  day.appendChild(precip);
  return day;
}
//добавляет в заголовок название города, текущую дату и день недели
let header = document.querySelector('.weater-header');
let placeToday = makeElement('span', 'place-today', city + ', ' + getDateDay(now) + ', ' + getDayWeek(now));
header.appendChild(placeToday);

let dayList = document.querySelector('.weather-day-list');

//перебор всех входных данных о погоде, добавление элемента, если дата не прошедшая
for (let i = 0; i < weather.length; i++) {
  let dayWeatherItem = new DayWeather(weather[i]);
  if (dayWeatherItem.date.valueOf() > today) {
    let dayItem = createDay(dayWeatherItem);
    dayList.appendChild(dayItem);
  }  
}