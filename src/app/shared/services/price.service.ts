import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Price } from '../model/Price.model';

@Injectable({
  providedIn: 'root'
})
export class PriceService {
  private readonly endpoint1 = 'http://localhost:8080/change-row-price';
  private readonly endpoint2 = 'http://localhost:8080/change-elc-price';
  // private readonly endpoint3 = 'http://localhost:8080/change-row-actual-price';
  // private readonly endpoint4 = 'http://localhost:8080/change-elc-actual-price';
  private readonly endpoint5 = 'http://localhost:8080/get-price';
  constructor(private readonly http: HttpClient) {}
  public changeRowStanderd(price: Price): Observable<void> {
    return this.http.post<void>(this.endpoint1, price);
  }
  public changeElcStanderd(price: Price): Observable<void> {
    return this.http.post<void>(this.endpoint2, price);
  }
  // public changeRowActual(price: Price): Observable<void> {
  //   return this.http.post<void>(this.endpoint3, price);
  // }
  // public changeElcActual(price: Price): Observable<void> {
  //   return this.http.post<void>(this.endpoint4, price);
  // }
  public getPrice(): Observable<Price> {
    return this.http.get<Price>(this.endpoint5);
  }
}
