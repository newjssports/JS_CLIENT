import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-category-item-setup',
  templateUrl: './category-item-setup.component.html',
  styleUrl: './category-item-setup.component.scss'
})
export class CategoryItemSetupComponent implements OnInit {
  categoryForm!: FormGroup;
  itemForm!: FormGroup;
  categories: Category[] = [];
  items: Item[] = [];
  selectedCategoryId: number | null = null;
  selectedItemId: number | null = null; // Example for item selection

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      id: [null],
      name: ['']
    });

    this.itemForm = this.fb.group({
      id: [null],
      itemName: [''],
      description: [''],
      itemCategoryId: [null],
      sku: [''],
      upc: [''],
      costPrice: [''],
      sellingPrice: [''],
      weight: [''],
      color: [''],
      size: [''],
      dimensions: [''],
      brand: [''],
      model: ['']
    });
  }

  addCategory(): void {
    const category = this.categoryForm.value;
    if (category.id === null) {
      // Add new category
      this.categories.push({ id: Date.now(), name: category.name });
    } else {
      // Edit existing category
      const index = this.categories.findIndex(cat => cat.id === category.id);
      if (index > -1) {
        this.categories[index] = category;
      }
    }
    this.categoryForm.reset();
  }
  getCategoryName(categoryId: number | undefined): string {
    const category = this.categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'No Category';
  }
  editCategory(category: Category): void {
    this.categoryForm.patchValue(category);
  }

  deleteCategory(id: number): void {
    this.categories = this.categories.filter(cat => cat.id !== id);
  }

  addItem(): void {
    const item = this.itemForm.value;
    if (item.id === null) {
      // Add new item
      this.items.push({ id: Date.now(), ...item });
    } else {
      // Edit existing item
      const index = this.items.findIndex(itm => itm.id === item.id);
      if (index > -1) {
        this.items[index] = item;
      }
    }
    this.itemForm.reset();
  }

  editItem(item: Item): void {
    this.itemForm.patchValue(item);
    this.selectedCategoryId = item.itemCategoryId;
  }

  deleteItem(id: number): void {
    this.items = this.items.filter(itm => itm.id !== id);
  }

  onCategoryChange(event: any): void {
    this.selectedCategoryId = event.value;
  }
}


// models.ts

export interface Category {
  id: number;
  name: string;
}

export interface Item {
  id: number;
  itemName: string;
  description: string;
  itemCategoryId: number;
  sku: string;
  upc: string;
  costPrice: number;
  sellingPrice: number;
  weight: number;
  color: string;
  size: string;
  dimensions: string;
  brand: string;
  model: string;
}