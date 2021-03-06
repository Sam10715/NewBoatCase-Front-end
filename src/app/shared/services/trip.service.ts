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
  private readonly endpoint7 = 'http://localhost:8080/get-trip-overview';
  private readonly endpoint8 = 'http://localhost:8080/get-allReserved-trips';
  private readonly endpoint9 = 'http://localhost:8080/delete-reservation';
  private readonly endpoint10 = 'http://localhost:8080/get-un-reserved-trips';
  private readonly endpoint11 = 'http://localhost:8080/delete-ended-trips';
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
  public getTripOverView(date): Observable<number[]> {
    return this.http.get<number[]>(this.endpoint7 + '/' + date);
  }
  public getAllReservedTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.endpoint8);
  }
  public deleteReservation(id): Observable<void> {
    return this.http.get<void>(this.endpoint9 + '/' + id);
  }
  public getUnReservedTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.endpoint10);
  }
  public deleteEndedTrips(): Observable<void> {
    return this.http.delete<void>(this.endpoint11);
  }
}
