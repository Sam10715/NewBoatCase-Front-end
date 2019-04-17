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

  constructor(private readonly http: HttpClient) {}

  public getInProgressBoats(): Observable<Boat[]> {
    return this.http.get<Boat[]>(this.endpoint1);
  }
}
