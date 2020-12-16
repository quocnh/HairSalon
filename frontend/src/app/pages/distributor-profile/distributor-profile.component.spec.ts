import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorProfileComponent } from './distributor-profile.component';

describe('DistributorProfileComponent', () => {
  let component: DistributorProfileComponent;
  let fixture: ComponentFixture<DistributorProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistributorProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributorProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
