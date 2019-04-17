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
  public newForm2: AddGuest = new AddGuest();
  public boats: Boat[] = [];

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
    const type = (document.getElementById('boatType') as HTMLInputElement)
      .value;
    const numOfPersons = (document.getElementById(
      'NumOfPersons'
    ) as HTMLInputElement).value;
    const numberOfPersons1 = parseInt(numOfPersons);
    this.tripService.getAvaBoats(type, numberOfPersons1).subscribe(boats1 => {
      if (boats1.length === 0) {
        alert('No boats are available');
      } else {
        alert('an available boat exists ');
      }
    });
  }
  public onFormSubmit() {
    const guest: Guest = this.newForm2.getModel();
    const trip: Trip = new Trip();
    const type = (document.getElementById('boatType') as HTMLInputElement)
      .value;
    const numOfPersons = (document.getElementById(
      'NumOfPersons'
    ) as HTMLInputElement).value;
    const numberOfPersons1 = parseInt(numOfPersons);
    trip.boatType = type;
    trip.guest = guest;
    trip.numberOfPerson = numberOfPersons1;

    trip.startDate = new Date();
    this.tripService.startTrip(trip).subscribe(() => {
      this.boatService.getInProgressBoats().subscribe(boats1 => {
        this.boats = boats1;
      });
    });
    this.newForm2.reset();
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
