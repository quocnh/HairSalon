import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { confirmProductOrderComponent } from './confirm_productOrder.component';

describe('ConfirmComponent', () => {
  let component: confirmProductOrderComponent;
  let fixture: ComponentFixture<confirmProductOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ confirmProductOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(confirmProductOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
