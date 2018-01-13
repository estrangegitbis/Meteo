import {Component, OnInit} from '@angular/core';
import { Geolocation } from "@ionic-native/geolocation";

import { NavController } from 'ionic-angular';
import {openWeatherConfig} from '../../app/openWeatherConfig';
import {WeatherService} from '../../app/weather.service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{


  ngOnInit(): void{
    this.geolocation.getCurrentPosition().then((resp)=> {

      console.log(resp);

      let latitude = resp.coords.latitude;
      let longitude = resp.coords.longitude;

      console.log(latitude);
      console.log(longitude);

    }).catch((error) => {
      console.log('Error getting location');
      console.log('Code d\'erreur: ' + error.code);
      console.log('Message d\'erreur: ' + error.message);
    })
  }

  private data = false;
  private noData = false;
  private search = '';
  private weatherData = new WeatherData();
  private weatherForecastDatas = [];

  constructor(public navCtrl: NavController,
                private geolocation: Geolocation,
                private weatherService: WeatherService) {

  }

  loadWeather(): void {
    this.weatherService.getWeather(this.search)
      .subscribe(data => {

        this.weatherData = this.getWeatherData(data);

        this.data = true;
        this.noData = false;
      },
      err=>{
        this.data = false;
        this.noData = true;
      });

    this.weatherService.getForcast(this.search)
      .subscribe(data => {

          this.weatherForecastDatas = [];

          let list = data['list'];

          let now = new Date();

          let date1 = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 12).getTime();
          let date2 = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2, 12).getTime();
          let date3 = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 3, 12).getTime();

          let date1Ok = false;
          let date2Ok = false;
          let date3Ok = false;


          for(let i = 0; i < list.length; i++)
          {
            if(!date1Ok && ((list[i].dt * 1000)>date1)){
                this.weatherForecastDatas.push(this.getWeatherData(list[i]));
                date1Ok = true;
            }

            if(!date2Ok && ((list[i].dt * 1000)>date2)){
              this.weatherForecastDatas.push(this.getWeatherData(list[i]));
              date2Ok = true;
            }

            if(!date3Ok && ((list[i].dt * 1000)>date3)){
              this.weatherForecastDatas.push(this.getWeatherData(list[i]));
              date3Ok = true;
            }
          }
        },
        err=>{
          this.weatherForecastDatas = [];
          console.log(JSON.stringify(err));
        });
  }

  typping(): void {
    this.noData = false;
  }

  getWeatherData(data): WeatherData {
    let weatherDataTemp = new WeatherData();

    weatherDataTemp.day = this.weekDay(data['dt']);
    weatherDataTemp.icon = openWeatherConfig.imgUrl + data['weather'][0].icon + '.png';
    weatherDataTemp.main = data['weather'][0].main;
    weatherDataTemp.city = data['name'];
    weatherDataTemp.description = data['weather'][0].description;
    weatherDataTemp.temp = Math.round(data['main'].temp);

    return weatherDataTemp;



  }
  
  private weekDay(UNIX_timestamp){
    let a = new Date(UNIX_timestamp * 1000);

    let days = ['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'];
    return days[a.getDay()];
  }

}

class WeatherData {
  day: String;
  icon: String;
  main: String;
  city: String;
  description: String;
  temp: number;
}
