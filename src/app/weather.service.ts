import { Injectable }     from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { openWeatherConfig } from "./openWeatherConfig";

@Injectable()
export class WeatherService {

  constructor(private http: HttpClient) {
  }

  public getWeather(city: string) {
    let url = openWeatherConfig.weatherUrlByName + city + openWeatherConfig.units
      + openWeatherConfig.appid;

    return this.http.get(url);
  }

  public getForcast(city: string) {
    let url = openWeatherConfig.forecastUrlByName + city + openWeatherConfig.units
      + openWeatherConfig.appid;

    return this.http.get(url);
  }

  public getWeatherCurrentPosition(latitude: number, longitude: number): Observable<Object> {

    let url = openWeatherConfig.weatherUrl + 'lat=' + latitude + '&lon=' + longitude
      + openWeatherConfig.units + openWeatherConfig.appid;
    return this.http.get(url);

  }
}
