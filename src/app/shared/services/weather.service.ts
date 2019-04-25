import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeatherCall } from '../model/WeatherCall.model';
import { Weather } from '../model/Weather.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private readonly endpoint1 = 'http://localhost:8080/save-weather';

  constructor(private readonly http: HttpClient) {}

  public getweatherInformation(): Observable<WeatherCall> {
    return this.http.get<WeatherCall>('');
  }

  public saveWeatherInformation(weather: Weather): Observable<void> {
    return this.http.post<void>(this.endpoint1, weather);
  }
}
