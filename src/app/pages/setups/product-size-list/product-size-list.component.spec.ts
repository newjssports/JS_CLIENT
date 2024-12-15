import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSizeListComponent } from './product-size-list.component';

describe('ProductSizeListComponent', () => {
  let component: ProductSizeListComponent;
  let fixture: ComponentFixture<ProductSizeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductSizeListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductSizeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
