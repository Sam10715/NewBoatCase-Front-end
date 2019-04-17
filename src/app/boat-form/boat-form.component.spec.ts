import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoatFormComponent } from './boat-form.component';

describe('RowboatFormComponent', () => {
  let component: BoatFormComponent;
  let fixture: ComponentFixture<BoatFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoatFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoatFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
