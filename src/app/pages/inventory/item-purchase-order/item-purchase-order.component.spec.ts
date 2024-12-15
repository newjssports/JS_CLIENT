import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemPurchaseOrderComponent } from './item-purchase-order.component';

describe('ItemPurchaseOrderComponent', () => {
  let component: ItemPurchaseOrderComponent;
  let fixture: ComponentFixture<ItemPurchaseOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemPurchaseOrderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemPurchaseOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
