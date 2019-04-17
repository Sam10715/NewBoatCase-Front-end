import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoatFormComponent } from './boat-form/boat-form.component';
import { TripComponent } from './trip/trip.component';
import { ReservationComponent } from './reservation/reservation.component';

const routes: Routes = [
  {
    path: 'addboat',
    component: BoatFormComponent
  },
  {
    path: 'reservation',
    component: ReservationComponent
  },
  {
    path: 'trip',
    component: TripComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
