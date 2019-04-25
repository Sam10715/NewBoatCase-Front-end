import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ElectricalBoat } from '../model/ElctricalBoat.model';

@Injectable({
  providedIn: 'root'
})
export class ElcBoatService {
  private readonly endpoint1 = 'http://localhost:8080/save-electricalboat';

  constructor(private readonly http: HttpClient) {}

  public saveElcBoat(electricalBoat: ElectricalBoat): Observable<boolean> {
    return this.http.post<boolean>(this.endpoint1, electricalBoat);
  }
}
