import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmForgetPasswordComponent } from './confirm-forget-password.component';

describe('ConrfirmForgetPasswordComponent', () => {
  let component: ConfirmForgetPasswordComponent;
  let fixture: ComponentFixture<ConfirmForgetPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmForgetPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmForgetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
