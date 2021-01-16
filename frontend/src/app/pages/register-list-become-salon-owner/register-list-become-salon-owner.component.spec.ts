import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterListBecomeSalonOwnerComponent } from './register-list-become-salon-owner.component';

describe('RegisterListBecomeSalonOwnerComponent', () => {
  let component: RegisterListBecomeSalonOwnerComponent;
  let fixture: ComponentFixture<RegisterListBecomeSalonOwnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterListBecomeSalonOwnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterListBecomeSalonOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
