import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalonOwnersListComponent } from './salon-owners-list.component';

describe('SalonOwnersListComponent', () => {
  let component: SalonOwnersListComponent;
  let fixture: ComponentFixture<SalonOwnersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalonOwnersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalonOwnersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
