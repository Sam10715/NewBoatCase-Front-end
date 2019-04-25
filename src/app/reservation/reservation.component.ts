import { Component, OnInit } from '@angular/core';

import { TripService } from '../shared/services/trip.service';
import { AddGuest } from '../trip/add-guest';
import { Trip } from '../shared/model/Trip.model';
import { Guest } from '../shared/model/Guest.model';
import { Boat } from '../shared/model/Boat.model';
import { BoatService } from '../shared/services/boat.service';
import { formatDate } from '@angular/common';
declare var require: any;
@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  public showStartTime = true;
  public boats1: Boat[];
  public min: Date = new Date();
  public min1: Date;
  public max: Date;
  public showEndTime: boolean = false;
  public showAva: boolean = false;
  public showGuestInformaiton: boolean = false;
  public newForm2: AddGuest = new AddGuest();
  public trips: Trip[] = [];
  public startAt: Date;
  public boats: Boat[];
  public startDate: Date;
  public endDate: Date;
  public disableNumber = false;
  public disableType = false;

  constructor(
    private readonly tripService: TripService,
    private readonly boatService: BoatService
  ) {}

  ngOnInit() {
    this.tripService.getReservedTrips().subscribe(trips => {
      this.trips = trips;
    });
    this.boatService.getInProgressBoats().subscribe(boats1 => {
      this.boats = boats1;
    });
  }
  public setStartTime() {
    let date_ = (document.getElementById('DT1') as HTMLInputElement).value;
    let date = new Date(date_);

    let SunCalc = require('suncalc');
    let times = SunCalc.getTimes(date, 46.15, 10.966667);
    let sunSetTime = times.sunset.getHours();
    let sunSetTimeMinute = times.sunset.getMinutes();
    let time = times.sunset.getTime();

    this.startDate = new Date(date);

    if (!isNaN(date.getDate())) {
      // if (date.getHours() < SunSetTime - 1 && date.getHours() > 6)
      if (date.getTime() < time - 3600000 && date.getHours() > 6) {
        this.showEndTime = true;
        this.showStartTime = false;
      } else {
        alert(
          'Please choose time between 7:00 and ' +
            ' ' +
            (sunSetTime - 1) +
            ':' +
            sunSetTimeMinute
        );
      }
    } else {
      alert('please Enter a Valid Date');
    }
    let date1 = date.setHours(date.getHours() + 1);
    let date2 = new Date(date1);

    this.min1 = date2;
    this.startAt = date2;

    let year = date2.getFullYear();
    let month = date2.getMonth();
    let day = date2.getDate();
    this.max = new Date(year, month, day, sunSetTime, sunSetTimeMinute, 0, 0);
  }
  public setEndTime() {
    let date_ = (document.getElementById('DT2') as HTMLInputElement).value;
    let date = new Date(date_);
    this.endDate = new Date(date);
    if (!isNaN(date.getDate())) {
      this.showAva = true;
      this.showEndTime = false;
    } else {
      alert('Please Enter a valid Date');
    }
  }
  public CheckAva() {
    let x = '';
    // let date_ = (document.getElementById('DT1') as HTMLInputElement).value;
    // let date = new Date(date_);
    // let date1_ = (document.getElementById('DT2') as HTMLInputElement).value;
    // let date1 = new Date(date1_);
    let type = (document.getElementById('boatType') as HTMLInputElement).value;
    let numOfPersons = (document.getElementById(
      'NumOfPersons'
    ) as HTMLInputElement).value;
    let numberOfPersons1 = parseInt(numOfPersons);
    if (
      isNaN(numberOfPersons1) ||
      numberOfPersons1 === 0 ||
      numberOfPersons1 < 0
    ) {
      alert('Please Enter a valid number of persons');
      return;
    }

    let x1 = this.startDate.getTimezoneOffset() * 60000;
    let strDate = new Date(this.startDate.getTime() - x1);
    let endDate = new Date(this.endDate.getTime() - x1);

    let start = strDate.toISOString().substring(0, 19);
    let end = endDate.toISOString().substring(0, 19);

    this.tripService
      .getAvaBoatsForReservation(start, end, type, numberOfPersons1)
      .subscribe(boats1 => {
        if (boats1.length === 0) {
          alert('No boats are available');
          this.showStartTime = true;
          this.showAva = false;
        } else {
          for (let i = 0; i < boats1.length; i++) {
            x =
              'boat number ' +
              boats1[i].boatNumber.toString() +
              ' ' +
              'with  number of seats ' +
              boats1[i].numberOfSeats.toString() +
              ' ' +
              'is available' +
              '                                 ' +
              x;
          }
          alert(x);
          this.disableNumber = true;
          this.disableType = true;
          this.showAva = false;
          this.showGuestInformaiton = true;
        }
      });
  }
  public onFormSubmit() {
    // const date_ = (document.getElementById('DT1') as HTMLInputElement).value;
    // let date = new Date(date_);
    // let date1_ = (document.getElementById('DT2') as HTMLInputElement).value;
    // let date1 = new Date(date1_);

    if (confirm('Are you you want to make a reservation !')) {
    } else {
      this.newForm2.reset();
      this.showGuestInformaiton = false;
      this.showStartTime = true;

      return;
    }
    let type = (document.getElementById('boatType') as HTMLInputElement).value;
    let numOfPersons = (document.getElementById(
      'NumOfPersons'
    ) as HTMLInputElement).value;
    let numberOfPersons1 = parseInt(numOfPersons);
    if (
      isNaN(numberOfPersons1) ||
      numberOfPersons1 === 0 ||
      numberOfPersons1 < 0
    ) {
      alert('Please Enter a valid number of persons');
      return;
    }
    let trip: Trip = new Trip();
    const guest: Guest = this.newForm2.getModel();

    let x1 = this.startDate.getTimezoneOffset() * 60000;
    let strDate = new Date(this.startDate.getTime() - x1);
    let endDate = new Date(this.endDate.getTime() - x1);

    trip.startDate = strDate;
    trip.endDate = endDate;
    trip.guest = guest;
    trip.boatType = type;
    trip.numberOfPerson = numberOfPersons1;
    trip.tripStatus = ' ';

    this.tripService.makeReservation(trip).subscribe(trip1 => {
      alert(
        'Reservation Number is:' +
          ' ' +
          trip1.id +
          ' ' +
          'Boat Number is:' +
          ' ' +
          trip1.boat.boatNumber
      );

      this.tripService.getReservedTrips().subscribe(trips => {
        this.trips = trips;
      });
    });
    this.newForm2.reset();
    this.showGuestInformaiton = false;
    this.showStartTime = true;
    this.disableNumber = false;
    this.disableType = false;
  }
  public startTrip() {
    if ((document.getElementById('startTrip') as HTMLInputElement) === null) {
      alert('You don not have any trips');
      return;
    }

    if (confirm('Are you sure you want to start a trip !')) {
    } else {
      return;
    }
    let id_ = (document.getElementById('startTrip') as HTMLInputElement).value;
    let id = parseInt(id_);
    let trip: Trip = new Trip();

    trip.id = id;

    this.tripService.startTrip(trip).subscribe(() => {
      this.tripService.getReservedTrips().subscribe(trips => {
        this.trips = trips;
      });
      this.boatService.getInProgressBoats().subscribe(boats1 => {
        this.boats = boats1;
      });
    });
  }
  public stopTrip() {
    const boatNumber = (document.getElementById(
      'boatNumber'
    ) as HTMLInputElement).value;
    // tslint:disable-next-line: radix
    let boatNumber1 = Number.parseInt(boatNumber);

    if (isNaN(boatNumber1)) {
      alert('You don not have any trips');
      return;
    }

    if (confirm('Are you sure you want to stop a trip !')) {
    } else {
      return;
    }

    this.tripService.stopTrip(boatNumber1).subscribe(trip => {
      this.boatService.getInProgressBoats().subscribe(boats1 => {
        this.boats = boats1;
        let x = trip.startDate.toString().substring(11, 16);
        let x1 = trip.endDate.toString().substring(11, 16);
        alert(
          'Price is ' +
            trip.price +
            ' ' +
            'Trip started at' +
            ' ' +
            x +
            ' ' +
            'Trip Ended at' +
            ' ' +
            x1 +
            ' ' +
            'Guest name is:' +
            ' ' +
            trip.guest.name +
            ' ' +
            'Guest Mobile Number is:' +
            ' ' +
            trip.guest.mobileNumber
        );
        this.tripService.getReservedTrips().subscribe(trips => {
          this.trips = trips;
        });
      });
    });
  }
}
