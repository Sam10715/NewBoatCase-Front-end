import { BrowserModule } from '@angular/platform-browser';
import { NgModule, OnInit } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BoatFormComponent } from './boat-form/boat-form.component';
import { TripComponent } from './trip/trip.component';
import { ReservationComponent } from './reservation/reservation.component';
import { OverviewComponent } from './overview/overview.component';

import { TripService } from './shared/services/trip.service';

import { BoatTypePipe } from './shared/model/boat-type.pipe';

@NgModule({
  declarations: [
    AppComponent,
    BoatFormComponent,
    TripComponent,
    ReservationComponent,
    OverviewComponent,
    BoatTypePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
