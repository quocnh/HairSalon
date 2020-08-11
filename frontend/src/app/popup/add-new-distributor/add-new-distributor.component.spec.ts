import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewDistributorComponent } from './add-new-distributor.component';

describe('AddNewDistributorComponent', () => {
  let component: AddNewDistributorComponent;
  let fixture: ComponentFixture<AddNewDistributorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewDistributorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewDistributorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
