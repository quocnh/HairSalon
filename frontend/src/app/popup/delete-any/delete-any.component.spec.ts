import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAnyComponent } from './delete-any.component';

describe('DeleteAnyComponent', () => {
  let component: DeleteAnyComponent;
  let fixture: ComponentFixture<DeleteAnyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteAnyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteAnyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
