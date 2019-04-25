import { Component, OnInit } from '@angular/core';
import { AddRowBoatForm } from './add-row-boat';
import { RowBoatService } from '../shared/services/row-boat.service';
import { RowBoat } from '../shared/model/RowBoat.model';
import { AddElcBoatForm } from './add-elctrical-boat';
import { ElcBoatService } from '../shared/services/elc-boat.service';
import { ElectricalBoat } from '../shared/model/ElctricalBoat.model';
import { Boat } from '../shared/model/Boat.model';
import { BoatService } from '../shared/services/boat.service';

@Component({
  selector: 'app-boat-form',
  templateUrl: './boat-form.component.html',
  styleUrls: ['./boat-form.component.css']
})
export class BoatFormComponent implements OnInit {
  public disabledBoats: Boat[] = [];
  public allBoats: Boat[] = [];
  public allWorkingBoats: Boat[] = [];
  public BlockedBoats: Boat[] = [];
  public UnBlockedBoats: Boat[] = [];
  public newForm: AddRowBoatForm = new AddRowBoatForm();
  public newForm1: AddElcBoatForm = new AddElcBoatForm();
  constructor(
    private rowBoatService: RowBoatService,
    private readonly elcBoatService: ElcBoatService,
    private readonly boatService: BoatService
  ) {}

  ngOnInit() {
    this.boatService
      .getBlockedBoats()
      .subscribe(boats => (this.BlockedBoats = boats));

    this.boatService
      .getUnBlockedBoats()
      .subscribe(boats => (this.UnBlockedBoats = boats));

    this.boatService
      .getAllWorkingBoats()
      .subscribe(boats => (this.allWorkingBoats = boats));
    this.boatService.getAllBoats().subscribe(boats => (this.allBoats = boats));

    this.boatService.getDisabledBoats().subscribe(boats => {
      this.disabledBoats = boats;
    });
  }
  public onFormSubmit() {
    const rowBoat: RowBoat = this.newForm.getModel();
    this.rowBoatService.saveRowBoat(rowBoat).subscribe(s => {
      if (s === true) {
        alert('You have add a boat !');
      } else {
        alert('Please Choose different boat number');
      }
      this.boatService
        .getAllWorkingBoats()
        .subscribe(boats => (this.allWorkingBoats = boats));
      this.boatService
        .getBlockedBoats()
        .subscribe(boats => (this.BlockedBoats = boats));
      this.boatService
        .getUnBlockedBoats()
        .subscribe(boats => (this.UnBlockedBoats = boats));
      this.boatService
        .getAllBoats()
        .subscribe(boats => (this.allBoats = boats));
    });

    this.newForm.reset();
  }
  public onFormSubmit1() {
    const elctricalBoat: ElectricalBoat = this.newForm1.getModel();
    this.elcBoatService.saveElcBoat(elctricalBoat).subscribe(s => {
      if (s === true) {
        alert('You have add a boat !');
      } else {
        alert('Please Choose different boat number');
      }
      this.boatService
        .getAllWorkingBoats()
        .subscribe(boats => (this.allWorkingBoats = boats));
      this.boatService
        .getBlockedBoats()
        .subscribe(boats => (this.BlockedBoats = boats));
      this.boatService
        .getUnBlockedBoats()
        .subscribe(boats => (this.UnBlockedBoats = boats));
      this.boatService
        .getAllBoats()
        .subscribe(boats => (this.allBoats = boats));
    });

    this.newForm1.reset();
  }
  public blockBoat() {
    const boatNumber_ = (document.getElementById(
      'unblockedBoat'
    ) as HTMLInputElement).value;
    const boatNumber = parseInt(boatNumber_);
    if (isNaN(boatNumber)) {
      alert('You don not have any Boats');
      return;
    }

    this.boatService.blockBoat(boatNumber).subscribe(() => {
      this.boatService
        .getBlockedBoats()
        .subscribe(boats => (this.BlockedBoats = boats));

      this.boatService
        .getUnBlockedBoats()
        .subscribe(boats => (this.UnBlockedBoats = boats));
    });
  }
  public unBlockBoat() {
    const boatNumber_ = (document.getElementById(
      'blockedBoat'
    ) as HTMLInputElement).value;
    const boatNumber = parseInt(boatNumber_);
    if (isNaN(boatNumber)) {
      alert('You don not have any Boats');
      return;
    }
    this.boatService.unBlockBoat(boatNumber).subscribe(() => {
      this.boatService
        .getBlockedBoats()
        .subscribe(boats => (this.BlockedBoats = boats));

      this.boatService
        .getUnBlockedBoats()
        .subscribe(boats => (this.UnBlockedBoats = boats));
    });
  }
  public disableboat() {
    const boatNumber_ = (document.getElementById(
      'DisableBoat'
    ) as HTMLInputElement).value;
    const boatNumber = parseInt(boatNumber_);
    if (isNaN(boatNumber)) {
      alert('You don not have any Boats');
      return;
    }
    this.boatService.disable(boatNumber).subscribe(() => {
      this.boatService
        .getAllWorkingBoats()
        .subscribe(boats => (this.allWorkingBoats = boats));

      this.boatService
        .getBlockedBoats()
        .subscribe(boats => (this.BlockedBoats = boats));
      this.boatService
        .getUnBlockedBoats()
        .subscribe(boats => (this.UnBlockedBoats = boats));

      this.boatService
        .getDisabledBoats()
        .subscribe(boats => (this.disabledBoats = boats));
    });
  }
  public deleteBoat() {
    const boatNumber_ = (document.getElementById(
      'deleteBoat'
    ) as HTMLInputElement).value;

    const boatNumber = parseInt(boatNumber_);
    if (isNaN(boatNumber)) {
      alert('You don not have any Boats');
      return;
    }
    this.boatService.getInProgressBoats().subscribe(boats2 => {
      for (let i = 0; i < boats2.length; i++) {
        if (boats2[i].boatNumber === boatNumber) {
          alert(
            'Please end the trip containing the boat before deleting the boat'
          );
          return;
        }
      }
      this.boatService.deleteBoat(boatNumber).subscribe(() => {
        this.boatService.getDisabledBoats().subscribe(boats => {
          this.disabledBoats = boats;
          this.boatService
            .getAllBoats()
            .subscribe(boats1 => (this.allBoats = boats1));
        });
      });
    });
  }
}
