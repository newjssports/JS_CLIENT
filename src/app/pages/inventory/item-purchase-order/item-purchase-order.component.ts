import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

// purchase-order.model.ts
export interface PurchaseOrderItem {
  PurchaseId?: number;
  SupplierId: number;
  ItemId: number;
  OrderDate: Date;
  ExpectedDeliveryDate?: Date;
  UnitPrice?: number;
  Quantity?: number;
  Price?: number;
  TotalPrice?: number;
}
@Component({
  selector: 'app-item-purchase-order',
  templateUrl: './item-purchase-order.component.html',
  styleUrl: './item-purchase-order.component.scss'
})
export class ItemPurchaseOrderComponent implements OnInit {
  purchaseOrderForm!: FormGroup;
  tempItems: PurchaseOrderItem[] = []; // Temporary storage for items
  suppliers: any[] = []; // Replace with actual supplier data
  items: any[] = []; // Replace with actual item data

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.purchaseOrderForm = this.fb.group({
      supplierId: ['', Validators.required],
      orderDate: ['', Validators.required],
      expectedDeliveryDate: [''],
      items: this.fb.array([]),
    });
  }

  get itemsArray(): FormArray {
    return this.purchaseOrderForm.get('items') as FormArray;
  }

  addItem(): void {
    this.itemsArray.push(this.fb.group({
      itemId: ['', Validators.required],
      unitPrice: [''],
      quantity: ['', Validators.required],
      price: [''],
      totalPrice: [''],
    }));
  }

  removeItem(index: number): void {
    this.itemsArray.removeAt(index);
  }

  addToTemporaryTable(): void {
    this.itemsArray.controls.forEach(control => {
      if (control.valid) {
        const item: PurchaseOrderItem = {
          SupplierId: this.purchaseOrderForm.value.supplierId,
          OrderDate: this.purchaseOrderForm.value.orderDate,
          ExpectedDeliveryDate: this.purchaseOrderForm.value.expectedDeliveryDate,
          ItemId: control.value.itemId,
          UnitPrice: control.value.unitPrice,
          Quantity: control.value.quantity,
          Price: control.value.price,
          TotalPrice: control.value.totalPrice,
        };
        this.tempItems.push(item);
      }
    });
    this.itemsArray.clear();
  }

  submitForm(): void {
    // Send tempItems to server or handle them accordingly
    console.log('Submitting items:', this.tempItems);
  }
}