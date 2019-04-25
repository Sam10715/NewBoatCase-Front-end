import { Component, OnInit } from '@angular/core';
import { Boat } from '../shared/model/Boat.model';
import { TripService } from '../shared/services/trip.service';
import { AddGuest } from './add-guest';
import { Guest } from '../shared/model/Guest.model';
import { Trip } from '../shared/model/Trip.model';
import { BoatService } from '../shared/services/boat.service';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})
export class TripComponent implements OnInit {
  public showGuestInformation = false;
  public newForm2: AddGuest = new AddGuest();
  public boats: Boat[] = [];
  public disableNumber = false;
  public disableType = false;

  constructor(
    private readonly tripService: TripService,
    private readonly boatService: BoatService
  ) {}

  ngOnInit() {
    this.boatService.getInProgressBoats().subscribe(boats1 => {
      this.boats = boats1;
    });
  }

  public checkAva() {
    let x = '';
    const type = (document.getElementById('boatType') as HTMLInputElement)
      .value;
    const numOfPersons = (document.getElementById(
      'NumOfPersons'
    ) as HTMLInputElement).value;
    const numberOfPersons1 = parseInt(numOfPersons);
    if (
      isNaN(numberOfPersons1) ||
      numberOfPersons1 === 0 ||
      numberOfPersons1 < 0
    ) {
      alert('Please Enter a valid number of persons');
      return;
    }

    this.tripService.getAvaBoats(type, numberOfPersons1).subscribe(boats1 => {
      if (boats1.length === 0) {
        alert('No boats are available');
      } else {
        for (let i = 0; i < boats1.length; i++) {
          x =
            'boat number ' +
            boats1[i].boatNumber.toString() +
            ' ' +
            'with  number of seats ' +
            boats1[i].numberOfSeats.toString() +
            ' ' +
            boats1[i].availability.toString() +
            ' ' +
            x;
        }

        alert(x);
        this.showGuestInformation = true;
        this.disableNumber = true;
        this.disableType = true;
      }
    });
  }
  public onFormSubmit() {
    if (confirm('Are you you want to start a trip !')) {
    } else {
      this.showGuestInformation = false;
      this.newForm2.reset();

      return;
    }
    const guest: Guest = this.newForm2.getModel();
    const trip: Trip = new Trip();
    const type = (document.getElementById('boatType') as HTMLInputElement)
      .value;
    const numOfPersons = (document.getElementById(
      'NumOfPersons'
    ) as HTMLInputElement).value;
    const numberOfPersons1 = parseInt(numOfPersons);
    if (
      isNaN(numberOfPersons1) ||
      numberOfPersons1 === 0 ||
      numberOfPersons1 < 0
    ) {
      alert('Please Enter a valid number of persons');
      return;
    }

    trip.boatType = type;
    trip.guest = guest;
    trip.numberOfPerson = numberOfPersons1;

    trip.startDate = new Date();
    this.tripService.startTrip(trip).subscribe(() => {
      this.boatService.getInProgressBoats().subscribe(boats1 => {
        this.boats = boats1;
      });
    });
    this.showGuestInformation = false;
    this.newForm2.reset();
    this.disableNumber = false;
    this.disableType = false;
  }
  public stopTrip() {
    const boatNumber = (document.getElementById(
      'boatNumber'
    ) as HTMLInputElement).value;
    // tslint:disable-next-line: radix
    const boatNumber1 = Number.parseInt(boatNumber);
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
      });
    });
  }
}
