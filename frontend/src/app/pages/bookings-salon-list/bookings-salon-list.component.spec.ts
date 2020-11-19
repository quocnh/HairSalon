import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingsSalonListComponent } from './bookings-salon-list.component';

describe('BookingsSalonListComponent', () => {
  let component: BookingsSalonListComponent;
  let fixture: ComponentFixture<BookingsSalonListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingsSalonListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingsSalonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
