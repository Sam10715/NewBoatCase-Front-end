import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Boat } from '../model/Boat.model';
import { Trip } from '../model/Trip.model';

@Injectable({
  providedIn: 'root'
})
export class BoatService {
  private readonly endpoint1 = 'http://localhost:8080/get-inporgress-boats';
  private readonly endpoint2 = 'http://localhost:8080/get-boats-overview';
  private readonly endpoint3 = 'http://localhost:8080/get-unblocked-boats';
  private readonly endpoint4 = 'http://localhost:8080/get-blocked-boats';
  private readonly endpoint5 = 'http://localhost:8080/block-boat';
  private readonly endpoint6 = 'http://localhost:8080/unblock-boat';
  private readonly endpoint7 = 'http://localhost:8080/disable-boat';
  private readonly endpoint8 = 'http://localhost:8080/get-all-working-Boats';
  private readonly endpoint9 = 'http://localhost:8080/get-all-Boats';
  private readonly endpoint10 = 'http://localhost:8080/get-disabled-Boats';
  private readonly endpoint11 = 'http://localhost:8080/delete-boat';

  constructor(private readonly http: HttpClient) {}

  public getInProgressBoats(): Observable<Boat[]> {
    return this.http.get<Boat[]>(this.endpoint1);
  }
  public getBoatsOverView(date: string): Observable<number[][]> {
    return this.http.get<number[][]>(this.endpoint2 + '/' + date);
  }
  public getBlockedBoats(): Observable<Boat[]> {
    return this.http.get<Boat[]>(this.endpoint3);
  }
  public getUnBlockedBoats(): Observable<Boat[]> {
    return this.http.get<Boat[]>(this.endpoint4);
  }
  public blockBoat(boatNumber: number): Observable<void> {
    return this.http.get<void>(this.endpoint5 + '/' + boatNumber);
  }
  public unBlockBoat(boatNumber: number): Observable<void> {
    return this.http.get<void>(this.endpoint6 + '/' + boatNumber);
  }
  public disable(boatNumber: number): Observable<void> {
    return this.http.get<void>(this.endpoint7 + '/' + boatNumber);
  }
  public getAllWorkingBoats(): Observable<Boat[]> {
    return this.http.get<Boat[]>(this.endpoint8);
  }
  public getAllBoats(): Observable<Boat[]> {
    return this.http.get<Boat[]>(this.endpoint9);
  }
  public getDisabledBoats(): Observable<Boat[]> {
    return this.http.get<Boat[]>(this.endpoint10);
  }
  public deleteBoat(boatNumber: number): Observable<void> {
    return this.http.delete<void>(this.endpoint11 + '/' + boatNumber);
  }
}
