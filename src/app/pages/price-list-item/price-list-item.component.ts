import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-price-list-item',
  templateUrl: './price-list-item.component.html',
  styleUrl: './price-list-item.component.scss'
})
export class PriceListItemComponent {
  @Input() formGroup!: FormGroup;
  @Output() remove = new EventEmitter<void>();

  removeItem(): void {
    this.remove.emit();
  }
}
