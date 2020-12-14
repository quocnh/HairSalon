import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorListViewComponent } from './distributor-list-view.component';

describe('DistributorListViewComponent', () => {
  let component: DistributorListViewComponent;
  let fixture: ComponentFixture<DistributorListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistributorListViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributorListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
