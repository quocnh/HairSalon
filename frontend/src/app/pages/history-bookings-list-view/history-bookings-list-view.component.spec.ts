import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryBookingsListViewComponent } from './history-bookings-list-view.component';

describe('BookingsListViewComponent', () => {
  let component: HistoryBookingsListViewComponent;
  let fixture: ComponentFixture<HistoryBookingsListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryBookingsListViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryBookingsListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
