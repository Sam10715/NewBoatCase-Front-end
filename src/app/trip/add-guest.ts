import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RowBoat } from '../shared/model/RowBoat.model';
import { Guest } from '../shared/model/Guest.model';
export class AddGuest extends FormGroup {
  constructor() {
    super({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(100)
      ]),
      idType: new FormControl('', [
        Validators.required,
        Validators.maxLength(100)
      ]),
      idNumber: new FormControl('', [
        Validators.required,
        Validators.maxLength(100)
      ]),
      mobileNumber: new FormControl('', [
        Validators.required,
        Validators.maxLength(100)
      ])
    });
  }

  /** Gets the model of this form */
  public getModel(): Guest {
    return {
      name: this.controls.name.value,
      idNumber: this.controls.idNumber.value,
      idType: this.controls.idType.value,
      mobileNumber: this.controls.mobileNumber.value
    };
  }
}
