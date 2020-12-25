import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BecomeSalonownerComponent } from './become-salonowner.component';

describe('BecomeSalonownerComponent', () => {
  let component: BecomeSalonownerComponent;
  let fixture: ComponentFixture<BecomeSalonownerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BecomeSalonownerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BecomeSalonownerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
