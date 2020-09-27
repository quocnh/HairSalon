import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalonEditComponent } from './salon-edit.component';

describe('SalonEditComponent', () => {
  let component: SalonEditComponent;
  let fixture: ComponentFixture<SalonEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalonEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalonEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
