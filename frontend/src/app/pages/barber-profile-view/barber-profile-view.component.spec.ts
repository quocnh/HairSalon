import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarberProfileViewComponent } from './barber-profile-view.component';

describe('BarberProfileViewComponent', () => {
  let component: BarberProfileViewComponent;
  let fixture: ComponentFixture<BarberProfileViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarberProfileViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarberProfileViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
