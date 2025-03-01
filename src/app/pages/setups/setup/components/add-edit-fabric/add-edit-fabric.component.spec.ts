import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditFabricComponent } from './add-edit-fabric.component';

describe('AddEditFabricComponent', () => {
  let component: AddEditFabricComponent;
  let fixture: ComponentFixture<AddEditFabricComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditFabricComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEditFabricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
