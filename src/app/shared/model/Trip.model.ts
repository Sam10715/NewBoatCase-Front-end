import { Guest } from './Guest.model';
import { Boat } from './Boat.model';

export class Trip {
  public id: number;
  public startDate: Date;
  public endDate: Date;
  public numberOfPerson: number;
  public boatType: string;
  public guest: Guest;
  public boat: Boat;
  public price: number;
  public tripStatus: string;
}
