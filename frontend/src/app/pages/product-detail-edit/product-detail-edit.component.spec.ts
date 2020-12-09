import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailEditComponent } from './product-detail-edit.component';

describe('ProductDetailEditComponent', () => {
  let component: ProductDetailEditComponent;
  let fixture: ComponentFixture<ProductDetailEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDetailEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
