import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalonOwnerProfileComponent } from './salon-owner-profile.component';

describe('SalonOwnerProfileComponent', () => {
  let component: SalonOwnerProfileComponent;
  let fixture: ComponentFixture<SalonOwnerProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalonOwnerProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalonOwnerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
