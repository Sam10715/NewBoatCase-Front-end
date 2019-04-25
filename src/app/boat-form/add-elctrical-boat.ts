import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ElectricalBoat } from '../shared/model/ElctricalBoat.model';

export class AddElcBoatForm extends FormGroup {
  constructor() {
    super({
      numberOfSeats: new FormControl('', [
        Validators.required,
        Validators.maxLength(100)
      ]),
      boatNumber: new FormControl('', [
        Validators.required,
        Validators.maxLength(100)
      ]),
      chargeTime: new FormControl('', [
        Validators.required,
        Validators.maxLength(100)
      ])
    });
  }

  /** Gets the model of this form */
  public getModel(): ElectricalBoat {
    return {
      numberOfSeats: this.controls.numberOfSeats.value,
      boatNumber: this.controls.boatNumber.value,
      BoatMaintenanceStatus: false,
      chargeTime: this.controls.chargeTime.value,
      availability: 'available till the end of the day'
    };
  }
}
