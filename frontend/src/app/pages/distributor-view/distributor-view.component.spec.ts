import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorViewComponent } from './distributor-view.component';

describe('DistributorViewComponent', () => {
  let component: DistributorViewComponent;
  let fixture: ComponentFixture<DistributorViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistributorViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
