import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationRequestComponent } from './application-request.component';

describe('ApplicationRequestComponent', () => {
  let component: ApplicationRequestComponent;
  let fixture: ComponentFixture<ApplicationRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
