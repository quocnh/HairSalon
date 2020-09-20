import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarberViewComponent } from './barber-view.component';

describe('BarberViewComponent', () => {
  let component: BarberViewComponent;
  let fixture: ComponentFixture<BarberViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarberViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarberViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
