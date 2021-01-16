import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterListBecomeDistributorComponent } from './register-list-become-distributor.component';

describe('RegisterListBecomeDistributorComponent', () => {
  let component: RegisterListBecomeDistributorComponent;
  let fixture: ComponentFixture<RegisterListBecomeDistributorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterListBecomeDistributorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterListBecomeDistributorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
