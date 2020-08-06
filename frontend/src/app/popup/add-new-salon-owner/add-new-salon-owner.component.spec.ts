import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewSalonOwnerComponent } from './add-new-salon-owner.component';

describe('AddNewSalonOwnerComponent', () => {
  let component: AddNewSalonOwnerComponent;
  let fixture: ComponentFixture<AddNewSalonOwnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewSalonOwnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewSalonOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
