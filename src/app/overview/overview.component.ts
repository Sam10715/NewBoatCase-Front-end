import { Component, OnInit } from '@angular/core';
import { TripService } from '../shared/services/trip.service';
import { BoatService } from '../shared/services/boat.service';
import { Trip } from '../shared/model/Trip.model';
import { PriceService } from '../shared/services/price.service';
import { Price } from '../shared/model/Price.model';
import { WeatherService } from '../shared/services/weather.service';
import { WeatherCall } from '../shared/model/WeatherCall.model';
import { Weather } from '../shared/model/Weather.model';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  public price: Price;
  public trips: Trip[] = [];
  public cancelledTrips: Trip[] = [];
  public numbers: number[] = [];
  public boatsInformation: number[][] = [];
  public boatNumbers: string;
  public tripInformaiton: number[] = [];
  constructor(
    private readonly tripService: TripService,
    private readonly boatService: BoatService,
    private readonly priceService: PriceService,
    private readonly weatherService: WeatherService
  ) {}

  ngOnInit() {
    this.tripService.getAllReservedTrips().subscribe(trips => {
      this.trips = trips;
    });
    this.tripService.getUnReservedTrips().subscribe(trips => {
      this.cancelledTrips = trips;
    });
    this.priceService.getPrice().subscribe(price => (this.price = price));
  }
  public deleteReservation() {
    const id_ = (document.getElementById(
      'ReservationNumber'
    ) as HTMLInputElement).value;
    const id = parseInt(id_);
    if (isNaN(id)) {
      alert('You don not have any Reservations');
      return;
    }

    this.tripService.deleteReservation(id).subscribe(() => {
      this.tripService.getAllReservedTrips().subscribe(trips => {
        this.trips = trips;
        alert('You have canceled the reservation');
      });
    });
  }
  public getTripInformation() {
    this.numbers = [];
    this.boatNumbers = '';

    const date_ = (document.getElementById('DT1') as HTMLInputElement).value;
    let date = new Date(date_);
    if (!isNaN(date.getDate())) {
    } else {
      alert('Please Enter a valid time');
      return;
    }
    let time = date.toISOString().substring(0, 19);

    this.tripService.getTripOverView(time).subscribe(numbers => {
      this.numbers = numbers;
      let num1 = [];
      for (var _i = 4; _i < numbers.length; _i++) {
        let num = numbers[_i];

        num1.push(num);

        this.boatNumbers = num1.toString();
      }
    });
  }
  public getBoatsOverView() {
    this.boatsInformation = [];
    this.tripInformaiton = [];
    const date_ = (document.getElementById('DT1') as HTMLInputElement).value;
    let date = new Date(date_);
    if (!isNaN(date.getDate())) {
    } else {
      alert('Please Enter a valid time');
      return;
    }
    let time = date.toISOString().substring(0, 19);
    this.boatService.getBoatsOverView(time).subscribe(numbers => {
      for (var i = 0; i < numbers.length - 1; i++) {
        let num = numbers[i];

        this.boatsInformation.push(num);
      }

      let num: number[] = numbers[numbers.length - 1];

      this.tripInformaiton = num;
    });
  }
  public deleteCancelledReservation() {
    const id_ = (document.getElementById(
      'ReservationNumber1'
    ) as HTMLInputElement).value;
    const id = parseInt(id_);
    if (isNaN(id)) {
      alert('You don not have any Reservations');
      return;
    }

    this.tripService.deleteReservation(id).subscribe(() => {
      this.tripService.getUnReservedTrips().subscribe(trips => {
        this.cancelledTrips = trips;
        alert('You have Deleted the reservation');
      });
    });
  }
  public changeRowStandaredPrice() {
    const price_ = (document.getElementById('RowS') as HTMLInputElement).value;
    const rowStanderdPrice = parseInt(price_);
    let price = new Price();
    price.rowStanderdPrice = rowStanderdPrice;
    this.priceService.changeRowStanderd(price).subscribe(() => {
      this.priceService.getPrice().subscribe(price => (this.price = price));
    });
  }
  // public changeRowActualPrice() {
  //   const price_ = (document.getElementById('RowA') as HTMLInputElement).value;
  //   const rowActualdPrice = parseInt(price_);
  //   let price = new Price();
  //   price.rowActualPrice = rowActualdPrice;
  //   this.priceService.changeRowActual(price).subscribe(() => {
  //     this.priceService.getPrice().subscribe(price => (this.price = price));
  //   });
  // }
  public changeElcStandaredPrice() {
    const price_ = (document.getElementById('ElcS') as HTMLInputElement).value;
    const price1 = parseInt(price_);
    let price = new Price();
    price.elcStandardPrice = price1;
    this.priceService.changeElcStanderd(price).subscribe(() => {
      this.priceService.getPrice().subscribe(price => (this.price = price));
    });
  }
  // public changeElcActualPrice() {
  //   const price_ = (document.getElementById('ElcA') as HTMLInputElement).value;
  //   const price1 = parseInt(price_);
  //   let price = new Price();
  //   price.elcActualPrice = price1;
  //   this.priceService.changeElcActual(price).subscribe(() => {
  //     this.priceService.getPrice().subscribe(price => (this.price = price));
  //   });
  // }

  // public getWeatherInformation() {
  //   this.weatherService.getweatherInformation().subscribe(x => {
  //     alert(x.weather[0].description);
  //     let weather = new Weather();
  //     weather.description = x.weather[0].description;
  //     this.weatherService.saveWeatherInformation(weather).subscribe();
  //     this.priceService.getPrice().subscribe(price => (this.price = price));
  //   });
  // }
  public deleteEndedTrips() {
    this.tripService.deleteEndedTrips().subscribe(() => {});
  }
}
