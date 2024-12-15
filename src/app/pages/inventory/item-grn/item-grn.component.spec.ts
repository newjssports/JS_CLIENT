import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemGrnComponent } from './item-grn.component';

describe('ItemGrnComponent', () => {
  let component: ItemGrnComponent;
  let fixture: ComponentFixture<ItemGrnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemGrnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemGrnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
