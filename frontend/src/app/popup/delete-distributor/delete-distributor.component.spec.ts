import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDistributorComponent } from './delete-distributor.component';

describe('DeleteDistributorComponent', () => {
  let component: DeleteDistributorComponent;
  let fixture: ComponentFixture<DeleteDistributorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteDistributorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDistributorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
