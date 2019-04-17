import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RowBoat } from '../model/RowBoat.model';

@Injectable({
  providedIn: 'root'
})
export class RowBoatService {
  private readonly endpoint1 = 'http://localhost:8080/save-rowboat';

  constructor(private readonly http: HttpClient) {}

  public saveRowBoat(rowBoat: RowBoat): Observable<void> {
    return this.http.post<void>(this.endpoint1, rowBoat);
  }
}
