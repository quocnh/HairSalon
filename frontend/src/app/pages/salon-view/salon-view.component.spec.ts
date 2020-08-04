import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalonViewComponent } from './salon-view.component';

describe('SalonViewComponent', () => {
  let component: SalonViewComponent;
  let fixture: ComponentFixture<SalonViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalonViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalonViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
