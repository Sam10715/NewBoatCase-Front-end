import { Component, OnInit } from '@angular/core';
import { AddRowBoatForm } from './add-row-boat';
import { RowBoatService } from '../shared/services/row-boat.service';
import { RowBoat } from '../shared/model/RowBoat.model';
import { AddElcBoatForm } from './add-elctrical-boat';
import { ElcBoatService } from '../shared/services/elc-boat.service';
import { ElectricalBoat } from '../shared/model/ElctricalBoat.model';

@Component({
  selector: 'app-boat-form',
  templateUrl: './boat-form.component.html',
  styleUrls: ['./boat-form.component.css']
})
export class BoatFormComponent implements OnInit {
  public newForm: AddRowBoatForm = new AddRowBoatForm();
  public newForm1: AddElcBoatForm = new AddElcBoatForm();
  constructor(
    private rowBoatService: RowBoatService,
    private readonly elcBoatService: ElcBoatService
  ) {}

  ngOnInit() {}
  public onFormSubmit() {
    const rowBoat: RowBoat = this.newForm.getModel();
    this.rowBoatService.saveRowBoat(rowBoat).subscribe(() => {});

    this.newForm.reset();
  }
  public onFormSubmit1() {
    const elctricalBoat: ElectricalBoat = this.newForm1.getModel();
    this.elcBoatService.saveElcBoat(elctricalBoat).subscribe(() => {});

    this.newForm.reset();
  }
}
