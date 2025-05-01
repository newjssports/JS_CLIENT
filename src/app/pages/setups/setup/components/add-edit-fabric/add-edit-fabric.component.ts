import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductModel, ProductsListModel } from 'src/app/models/product.model';
import { MockupService } from 'src/app/services/mockup.service';
import { ProductSetupService } from 'src/app/services/product-setup.service';
import { UserRightsService } from 'src/app/services/user-rights.service';

@Component({
  selector: 'app-add-edit-fabric',
  templateUrl: './add-edit-fabric.component.html',
  styleUrl: './add-edit-fabric.component.scss'
})

export class AddEditFabricComponent implements OnInit{

   productList: ProductsListModel[] = [];
   fabricForm!: FormGroup;
   selectedCategoryIndex: number | null = null;
  constructor(private fb: FormBuilder, private productSetupService: ProductSetupService
  ){

  }
  ngOnInit(): void {
    this.getAllProductsList();
    this.fabricForm = this.fb.group({
      productId: [null, Validators.required],
      fabrics: this.fb.array([this.createFabricGroup()])
  });
    
  }

  createFabricGroup(): FormGroup {
    return this.fb.group({
        name: ['', Validators.required],
        //code: ['', ],
        description: ['',]
    });
}

get fabrics(): FormArray {
  return this.fabricForm.get('fabrics') as FormArray;
}

isAddButtonEnabled(index: number): boolean {
  const fabricGroup = this.fabrics.at(index) as FormGroup;
  return fabricGroup.get('name')?.valid ?? false;
}
addFabric() {
    this.fabrics.push(this.createFabricGroup());
}

removeFabric(index: number) {
    if (this.fabrics.length > 1) {
        this.fabrics.removeAt(index);
    }
}


  getAllProductsList(){
    this.productSetupService.getAllProductsList().subscribe(products => {
      this.productList = products;
    });
  }

  addAllFabrics(): void {
    const val = this.fabricForm.getRawValue();
    console.log(val);
    this.productSetupService.addMultipleFabrics(this.fabricForm.getRawValue()).subscribe(res=>{
      if(res){
        
      }
    });
  }

  // editCategory(index: number): void {
  //   this.selectedCategoryIndex = index;
  //   this.fabricForm.patchValue({
  //     category: this.categories[index].category
  //   });
  // }

   updateMainCategory(): void {
  //   if (this.selectedCategoryIndex !== null) {
  //     this.categories[this.selectedCategoryIndex].category = this.fabricForm.value.category;
  //     this.selectedCategoryIndex = null;
  //     this.fabricForm.reset();
  //   }
   }

  // deleteCategory(index: number): void {
  //   this.categories.splice(index, 1);
  //   this.selectedCategoryIndex = null;
  //   this.fabricForm.reset();
  // }
}
