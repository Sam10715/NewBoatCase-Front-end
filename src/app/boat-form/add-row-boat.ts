import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RowBoat } from '../shared/model/RowBoat.model';
export class AddRowBoatForm extends FormGroup {
  constructor() {
    super({
      numberOfSeats: new FormControl('', [
        Validators.required,
        Validators.maxLength(100)
      ]),
      boatNumber: new FormControl('', [
        Validators.required,
        Validators.maxLength(100)
      ])
    });
  }

  /** Gets the model of this form */
  public getModel(): RowBoat {
    return {
      numberOfSeats: this.controls.numberOfSeats.value,
      boatNumber: this.controls.boatNumber.value,
      BoatMaintenanceStatus: false,
      availability: 'available till the end of the day'
    };
  }
}
