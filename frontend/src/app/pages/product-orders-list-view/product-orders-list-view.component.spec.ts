import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductOrdersListViewComponent } from './product-orders-list-view.component';

describe('ProductOrdersListViewComponent', () => {
  let component: ProductOrdersListViewComponent;
  let fixture: ComponentFixture<ProductOrdersListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductOrdersListViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductOrdersListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
