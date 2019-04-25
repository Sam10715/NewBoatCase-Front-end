import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'boatType'
})
export class BoatTypePipe implements PipeTransform {
  transform(number): string {
    if (number === -1) {
      number = 'Electrical';
      return number;
    }
    if (number === -2) number = 'Row';
    return number;
  }
}
