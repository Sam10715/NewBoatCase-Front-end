import { Component, OnInit } from '@angular/core';
import { invalid } from '@angular/compiler/src/render3/view/util';
import { TripService } from '../shared/services/trip.service';
import { AddGuest } from '../trip/add-guest';
import { Trip } from '../shared/model/Trip.model';
import { Guest } from '../shared/model/Guest.model';
import { Boat } from '../shared/model/Boat.model';
import { BoatService } from '../shared/services/boat.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
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
    const date_ = (document.getElementById('DT1') as HTMLInputElement).value;
    let date = new Date(date_);
    if (!isNaN(date.getDate())) {
      if (date.getHours() < 19) {
        this.showEndTime = true;
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
    this.max = new Date(year, month, day, 20, 0, 0, 0);
  }
  public setEndTime() {
    const date_ = (document.getElementById('DT2') as HTMLInputElement).value;
    let date = new Date(date_);
    if (!isNaN(date.getDate())) {
      this.showAva = true;
    } else {
      alert('Please Enter a valid Date');
    }
  }
  public CheckAva() {
    const date_ = (document.getElementById('DT1') as HTMLInputElement).value;
    let date = new Date(date_);
    const date1_ = (document.getElementById('DT2') as HTMLInputElement).value;
    let date1 = new Date(date1_);
    const type = (document.getElementById('boatType') as HTMLInputElement)
      .value;
    const numOfPersons = (document.getElementById(
      'NumOfPersons'
    ) as HTMLInputElement).value;
    const numberOfPersons1 = parseInt(numOfPersons);
    if (isNaN(numberOfPersons1)) {
      alert('Please Enter a valid number of persons');
      return;
    }

    let start = date.toISOString().substring(0, 19);
    let end = date1.toISOString().substring(0, 19);

    this.tripService
      .getAvaBoatsForReservation(start, end, type, numberOfPersons1)
      .subscribe(boats1 => {
        if (boats1.length === 0) {
          alert('No boats are available');
        } else {
          alert('an available boat exists ');
          this.showGuestInformaiton = true;
        }
      });
  }
  public onFormSubmit() {
    const date_ = (document.getElementById('DT1') as HTMLInputElement).value;
    let date = new Date(date_);
    const date1_ = (document.getElementById('DT2') as HTMLInputElement).value;
    let date1 = new Date(date1_);
    const type = (document.getElementById('boatType') as HTMLInputElement)
      .value;
    const numOfPersons = (document.getElementById(
      'NumOfPersons'
    ) as HTMLInputElement).value;
    const numberOfPersons1 = parseInt(numOfPersons);

    let start = date.toISOString().substring(0, 19);
    let end = date1.toISOString().substring(0, 19);
    let trip: Trip = new Trip();
    const guest: Guest = this.newForm2.getModel();
    trip.startDate = date;
    trip.endDate = date1;
    trip.guest = guest;
    trip.boatType = type;
    trip.numberOfPerson = numberOfPersons1;

    this.tripService.makeReservation(trip).subscribe(() => {
      this.tripService.getReservedTrips().subscribe(trips => {
        this.trips = trips;
      });
    });
  }
  public startTrip() {
    const id_ = (document.getElementById('startTrip') as HTMLInputElement)
      .value;
    const id = parseInt(id_);
    const trip: Trip = new Trip();

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
    const boatNumber1 = Number.parseInt(boatNumber);
    this.tripService.stopTrip(boatNumber1).subscribe(trip => {
      this.boatService.getInProgressBoats().subscribe(boats1 => {
        this.boats = boats1;
        alert(trip.guest.idNumber);
      });
    });
  }
}
