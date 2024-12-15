import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-item-grn',
  templateUrl: './item-grn.component.html',
  styleUrl: './item-grn.component.scss'
})
export class ItemGrnComponent implements OnInit {
  grnForm!: FormGroup;
  purchaseOrders: PurchaseOrder[] = []; // Replace with actual data
  items: Item[] = []; // Replace with actual item data
  suppliers: Supplier[] = []; // Replace with actual supplier data
  poItems: Item[] = []; // Temporary storage for PO items

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.grnForm = this.fb.group({
      purchaseOrderId: ['', Validators.required],
      grnDate: ['', Validators.required],
      supplierId: ['', Validators.required],
      receivedBy: [''],
      warehouseLocation: [''],
      comments: [''],
      items: this.fb.array([]),
    });

    // Load purchase orders, items, and suppliers here
  }

  get itemsArray(): FormArray {
    return this.grnForm.get('items') as FormArray;
  }

  onPurchaseOrderChange(poId: number): void {
    // Fetch PO items based on the selected PO ID
    this.poItems = this.fetchPoItems(poId); // Replace with actual fetch logic
    this.updateItemsArray();
  }

  fetchPoItems(poId: number): Item[] {
    // Implement fetching logic here
    return []; // Return fetched items
  }

  updateItemsArray(): void {
    const formArray = this.itemsArray;
    formArray.clear();

    this.poItems.forEach(item => {
      formArray.push(this.fb.group({
        ItemId: [item.id, Validators.required],
        ItemName: [item.name],
        UnitPrice: [item.unitPrice, Validators.required],
        QuantityReceived: ['', Validators.required],
        TotalAmount: [{ value: 0, disabled: true }]
      }));
    });
  }

  calculateTotalAmount(index: number): void {
    const formGroup = this.itemsArray.at(index);
    const quantity = formGroup.get('QuantityReceived')?.value;
    const unitPrice = formGroup.get('UnitPrice')?.value;
    const totalAmount = quantity * unitPrice;
    formGroup.get('TotalAmount')?.setValue(totalAmount, { emitEvent: false });
  }

  submitForm(): void {
    const grnData: GrnItem[] = this.itemsArray.getRawValue().map(item => ({
      ...item,
      GrnId: 0, // Auto-generated or leave as 0
      GrnDate: this.grnForm.value.grnDate,
      SupplierId: this.grnForm.value.supplierId,
      PurchaseOrderId: this.grnForm.value.purchaseOrderId,
    }));

    // Send grnData to server or handle it accordingly
    console.log('Submitting GRN:', grnData);
  }
}


// grn.model.ts
export interface GrnItem {
  GrnId?: number;
  SupplierId: number;
  GrnDate: Date;
  PurchaseOrderId: number;
  ItemId: number;
  QuantityReceived: number;
  UnitPrice: number;
  TotalAmount: number;
  ReceivedBy?: string;
  WarehouseLocation?: string;
  Comments?: string;
}

// supplier.model.ts
export interface Supplier {
  id: number;
  name: string;
}

// purchase-order.model.ts
export interface PurchaseOrder {
  id: number;
  supplierId: number;
  orderDate: Date;
  expectedDeliveryDate?: Date;
}

// item.model.ts
export interface Item {
  id: number;
  name: string;
  unitPrice: number;
}