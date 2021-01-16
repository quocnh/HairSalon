import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarbersSalonListComponent } from './barbers-salon-list.component';

describe('BarbersSalonListComponent', () => {
  let component: BarbersSalonListComponent;
  let fixture: ComponentFixture<BarbersSalonListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarbersSalonListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarbersSalonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
