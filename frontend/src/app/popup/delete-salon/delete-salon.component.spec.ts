import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSalonComponent } from './delete-salon.component';

describe('DeleteSalonComponent', () => {
  let component: DeleteSalonComponent;
  let fixture: ComponentFixture<DeleteSalonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteSalonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSalonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
