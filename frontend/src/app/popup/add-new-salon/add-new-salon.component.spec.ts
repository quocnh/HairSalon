import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewSalonComponent } from './add-new-salon.component';

describe('AddNewSalonComponent', () => {
  let component: AddNewSalonComponent;
  let fixture: ComponentFixture<AddNewSalonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewSalonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewSalonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
