import {apiKey} from './apiKey';

export const openWeatherConfig = {
  weatherUrlByName: 'http://api.openweathermap.org/data/2.5/weather?q=',
  forecastUrlByName: 'http://api.openweathermap.org/data/2.5/forecast?q=',
  weatherUrl: 'http://api.openweathermap.org/data/2.5/weather?',
  forecastUrl: 'http://api.openweathermap.org/data/2.5/forecast?',
  units: '&units=metric',
  appid: '&appid=' + apiKey.apiKey,
  imgUrl:'http://openweathermap.org/img/w/'
};
