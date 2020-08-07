import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSalonOwnerComponent } from './delete-salon-owner.component';

describe('DeleteSalonOwnerComponent', () => {
  let component: DeleteSalonOwnerComponent;
  let fixture: ComponentFixture<DeleteSalonOwnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteSalonOwnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSalonOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
