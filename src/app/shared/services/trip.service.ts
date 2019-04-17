import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RowBoat } from '../model/RowBoat.model';
import { Boat } from '../model/Boat.model';
import { Trip } from '../model/Trip.model';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  private readonly endpoint1 = 'http://localhost:8080/get-ava-boats';
  private readonly endpoint2 = 'http://localhost:8080/start-trip';
  private readonly endpoint3 = 'http://localhost:8080/stop-trip';
  private readonly endpoint4 = 'http://localhost:8080/get-avaBoats-reservation';
  private readonly endpoint5 = 'http://localhost:8080/make-reservation';
  private readonly endpoint6 = 'http://localhost:8080/get-Reserved-trips';

  constructor(private readonly http: HttpClient) {}

  public getAvaBoats(
    type: string,
    numberOfPersons: number
  ): Observable<Boat[]> {
    return this.http.get<Boat[]>(
      this.endpoint1 + '/' + type + '/' + numberOfPersons
    );
  }
  public getAvaBoatsForReservation(
    start: string,
    end: string,
    type: string,
    numberOfPerson: number
  ): Observable<Boat[]> {
    return this.http.get<Boat[]>(
      this.endpoint4 +
        '/' +
        start +
        '/' +
        end +
        '/' +
        type +
        '/' +
        numberOfPerson
    );
  }

  public startTrip(trip: Trip): Observable<void> {
    return this.http.post<void>(this.endpoint2, trip);
  }
  public stopTrip(boatNumber): Observable<Trip> {
    return this.http.get<Trip>(this.endpoint3 + '/' + boatNumber);
  }
  public makeReservation(trip: Trip): Observable<Trip> {
    return this.http.post<Trip>(this.endpoint5, trip);
  }
  public getReservedTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.endpoint6);
  }
}
