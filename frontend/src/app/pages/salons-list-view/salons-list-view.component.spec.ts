import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalonsListViewComponent } from './salons-list-view.component';

describe('SalonsListViewComponent', () => {
  let component: SalonsListViewComponent;
  let fixture: ComponentFixture<SalonsListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalonsListViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalonsListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
