import { Component, OnInit } from '@angular/core';
import { TripService } from './shared/services/trip.service';
import { WeatherService } from './shared/services/weather.service';
import { Subscription, timer, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Weather } from './shared/model/Weather.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  subscription: Subscription;
  ngOnInit() {
    this.subscription = interval(300000)
      .pipe(switchMap(() => this.weatherService.getweatherInformation()))
      .subscribe(x => {
        let weather = new Weather();
        weather.description = x.weather[0].description;
        this.weatherService.saveWeatherInformation(weather).subscribe();
      });
  }

  title = 'Boat';
  constructor(
    private readonly tripService: TripService,
    private readonly weatherService: WeatherService
  ) {}
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
