import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewBarberComponent } from './add-new-barber.component';

describe('AddNewBarberComponent', () => {
  let component: AddNewBarberComponent;
  let fixture: ComponentFixture<AddNewBarberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewBarberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewBarberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
