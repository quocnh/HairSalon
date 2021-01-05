import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyBookingComponent } from './modify-booking.component';

describe('ModifyBookingComponent', () => {
  let component: ModifyBookingComponent;
  let fixture: ComponentFixture<ModifyBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
