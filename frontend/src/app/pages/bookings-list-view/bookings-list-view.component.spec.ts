import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingsListViewComponent } from './bookings-list-view.component';

describe('BookingsListViewComponent', () => {
  let component: BookingsListViewComponent;
  let fixture: ComponentFixture<BookingsListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingsListViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingsListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
