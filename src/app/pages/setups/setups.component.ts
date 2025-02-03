import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryModel } from 'src/app/models/category.model';
import { MainCategoryModel } from 'src/app/models/MainCategoryModel';
import { MockupDesignStepsNameModel } from 'src/app/models/mockup-design-steps-name.model';
import { MockupDesignStepsModel } from 'src/app/models/mockup-design-steps.model';
import { AddEditProductModel, ProductsListModel } from 'src/app/models/product.model';
import { SubCategoryModel } from 'src/app/models/sub-category.model';
import { MockupService } from 'src/app/services/mockup.service';
import { ProductSetupService } from 'src/app/services/product-setup.service';

@Component({
  selector: 'app-setups',
  templateUrl: './setups.component.html',
  styleUrl: './setups.component.scss'
})
export class SetupsComponent implements OnInit {
  mainCategoryForm!: FormGroup;
  categoryForm!: FormGroup;
  subCategoryForm!: FormGroup;
  productItemForm!: FormGroup;
  mockupSteps!: FormGroup;
  mockupDesigningSteps!: FormGroup;

  categories: any[] = [];
  selectedCategoryIndex: number | null = null;
  selectedSubCategoryIndex: number | null = null;
  mainCategories: MainCategoryModel[] = [];
  categoriesByMainId: CategoryModel[] = [];
  subCatByCateId: SubCategoryModel[] = [];

  productList: ProductsListModel[] = [];

  mockupDesignNames : MockupDesignStepsNameModel[] = [];
  mockupDesignedNames : MockupDesignStepsNameModel[] = [];

  mockupDesignSteps: MockupDesignStepsModel[] = [];
  numbers: number[] = [];

  selectedFile_2D: File | null = null;
  selectedFile_3D: File | null = null;
  selectedFile_Sizes: File | null = null;
  previewImages: { [key: string]: string | ArrayBuffer | null } = {};
  previewImages2: { [key: string]: string | ArrayBuffer | null } = {};
  previewImages3: { [key: string]: string | ArrayBuffer | null } = {};

  constructor(private fb: FormBuilder, private productSetupService: ProductSetupService
    ,private mockupService : MockupService,
       private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMainCategory();
    this.getCategoryByMainId(1);
    this.getMockupDesignNames();
    this.getMockupCreatedDesignedNames();
    this.getMockupDesignSteps();
    this.getAllProductsList();
    this.mainCategoryForm = this.fb.group({
      mainCategoryId: [0],
      name:['',Validators.required],
      code:[''],
      description:['']
    });

    this.categoryForm = this.fb.group({
      categoryId: [0],
      name:['',Validators.required],
      code:[''],
      description:[''],
      mainCategoryId : [0,Validators.required]
    });

    this.subCategoryForm = this.fb.group({
      subCategoryId: [0],
      name:['',Validators.required],
      code:[''],
      description:[''],
      categoryId: [0,Validators.required]
    });

    this.productItemForm = this.fb.group({
      productId: [0],
      categoryId:[0,Validators.required],
      subCategoryId: [0,Validators.required],
      name: ['', Validators.required],
      code: [''],
      description: [''],
      isNeck: [false],
      isFrontDesc: [false],
      isBackDesc: [false],
      isOnlyDesc: [false],
      isLeftSleeveDesc: [false],
      isRightSleeveDesc: [false],
      frontImage: [''], // Item Image
      backImage: [''], // item Image
      isAllow1: [false], // Shoulder Panel Desc with Image
      isAllow2: [false], // Bag Strap  Desc with Image
      isAllow3: [false], // Inside Hood  Desc with Image
      isAllow4: [false], // Outside Hood  Desc with Image
      isAllow5: [false], // Back Midle Loop  Desc with Image
      isAllow6: [false], // Bag Front  Desc with Image
      isAllow7: [false], // Add 2D Mockup
      isAllow8: [false], // Add Size Spacs
      isAllow9: [false], // Add 3D Mockup
      isAllow10: [false], // Size Image
      isAllow11: [false], // Shorts Pocket
      isAllow12: [false], // Pant Pocket
      isAllow13: [false], // Wrestling Singlet Style

      add2dMockup: [''], 
      add3dMockup: [''], 
      addSizeSpecs: [''], 
      add2DMockupImage: [null], // File input field
      add3DMockupImage: [null], // File input field
      addSizeSpecsImage: [null], // File input field
    });

    
    this.mockupSteps = this.fb.group({
      fromMockupDesignStepId: [0, Validators.required],
      toMockupDesignStepId: [0, Validators.required],
    });

    this.mockupDesigningSteps = this.fb.group({
      fromMockupDesignStepId: [0, Validators.required],
      toMockupDesignStepId: [0, Validators.required],
    });

    this.productItemForm.get('categoryId')?.valueChanges.subscribe(categoryId => {
      this.getSubCategoryByCateId(categoryId);
      this.productItemForm.get('subCategoryId')?.setValue('');
      //this.products = [];
    });
  }

  getMockupDesignNames(){
    this.mockupService.getMockupDesignNames().subscribe(res => {
      this.mockupDesignNames = res;
    });
  }

  getMockupCreatedDesignedNames(){
    this.mockupService.getMockupCreatedDesignedNames().subscribe(res => {
      this.mockupDesignedNames = res;
    });
  }

  createMockupStep(){
    const formValue = this.mockupSteps.value;

    this.mockupService.createMockupStep(formValue).subscribe(res => {
      console.log(res);
    }, error => {
          console.error('Error submitting mockup', error);
        });
  }
  createMockupDesigningStep(){
    const formValue = this.mockupDesigningSteps.value;

    this.mockupService.createMockupStep(formValue).subscribe(res => {
      console.log(res);
    }, error => {
          console.error('Error submitting mockup', error);
        });
  }

  getMockupDesignSteps(){
    this.mockupService.getMockupDesignSteps().subscribe(res => {
      this.mockupDesignSteps = res;
    });
  }
  getMainCategory(){
    this.productSetupService.getMainCategories().subscribe(categories => {
      this.mainCategories = categories;
      // const defaultCategory = this.mainCategories.find(category => category.isDefault);
      // if (defaultCategory) {
      //   this.form.get('mainCategoryId')?.setValue(defaultCategory.mainCategoryId);
      //   this.getCategoryByMainId(defaultCategory.mainCategoryId);
      // }
    });
  }
  getCategoryByMainId(mainId: number){
    this.productSetupService.getCategoryByMainId(mainId).subscribe(categories => {
      this.categoriesByMainId = categories;
    });
  }
  getSubCategoryByCateId(id: number){
    this.productSetupService.getSubCategoryByCateId(id).subscribe(categories => {
      this.subCatByCateId = categories;
    });
  }
  addMainCategory(): void {
    this.categories.push({
      category: this.mainCategoryForm.value.category,
      subcategories: []
    });
    this.mainCategoryForm.reset();
  }

  editCategory(index: number): void {
    this.selectedCategoryIndex = index;
    this.mainCategoryForm.patchValue({
      category: this.categories[index].category
    });
  }

  updateMainCategory(): void {
    if (this.selectedCategoryIndex !== null) {
      this.categories[this.selectedCategoryIndex].category = this.mainCategoryForm.value.category;
      this.selectedCategoryIndex = null;
      this.mainCategoryForm.reset();
    }
  }

  deleteCategory(index: number): void {
    this.categories.splice(index, 1);
    this.selectedCategoryIndex = null;
    this.mainCategoryForm.reset();
  }

  addCategory(){

  }
  updateCategory(){

  }
  addSubCategory(): void {
    if (this.selectedCategoryIndex !== null) {
      this.categories[this.selectedCategoryIndex].subcategories.push({
        name: this.subCategoryForm.value.subCategory,
        items: []
      });
      this.subCategoryForm.reset();
    }
  }

  editSubCategory(catIndex: number, subIndex: number): void {
    this.selectedCategoryIndex = catIndex;
    this.selectedSubCategoryIndex = subIndex;
    this.subCategoryForm.patchValue({
      subCategory: this.categories[catIndex].subcategories[subIndex].name
    });
  }

  updateSubCategory(): void {
    if (this.selectedCategoryIndex !== null && this.selectedSubCategoryIndex !== null) {
      this.categories[this.selectedCategoryIndex].subcategories[this.selectedSubCategoryIndex].name =
        this.subCategoryForm.value.subCategory;
      this.selectedSubCategoryIndex = null;
      this.subCategoryForm.reset();
    }
  }

  deleteSubCategory(catIndex: number, subIndex: number): void {
    this.categories[catIndex].subcategories.splice(subIndex, 1);
    this.selectedSubCategoryIndex = null;
    this.subCategoryForm.reset();
  }

  // addItem(): void {
  //   if (this.productItemForm.valid) {
  //       const addProduct: AddEditProductModel = this.productItemForm.getRawValue();
  //       this.productSetupService.addEditProductItem(addProduct).subscribe(
  //         response => {
  //           //console.log('Product Added successfully', response);
  //           this._snackBar.open('Product Added successfully', 'X', {
  //             duration: 3000
  //           });
  //           // Handle successful registration
  //         },
  //         error => {
  //           //console.error('Error add product', error);
  //           this._snackBar.open('Error product not added!', 'X', {
  //             duration: 3000
  //           });
  //           // Handle error
  //         }
  //       );
  //     }
  // }

  addItem(): void {
    if (this.productItemForm.valid) {
      const formData = new FormData();
  
      // Append each form control to the FormData object
      Object.keys(this.productItemForm.controls).forEach((key) => {
        const controlValue = this.productItemForm.get(key)?.value;
  
        if (key === 'add2DMockupImage' || key === 'add3DMockupImage' || key === 'addSizeSpecsImage') {
          // Check if the control value is a File object
          if (controlValue instanceof File) {
            formData.append(key, controlValue, controlValue.name);
          }
        } else {
          formData.append(key, controlValue !== null ? controlValue.toString() : '');
        }
      });
  
      // Debugging output
      formData.forEach((value, key) => {
        console.log(`Key: ${key}, Value:`, value);
      });
  
      // Prepare the model for API submission
      const addProduct: AddEditProductModel = this.productItemForm.getRawValue();
      this.productSetupService.addEditProductItem(formData).subscribe(
        (response) => {
          this._snackBar.open('Product Added successfully', 'X', {
            duration: 3000,
          });
        },
        (error) => {
          this._snackBar.open('Error: Product not added!', 'X', {
            duration: 3000,
          });
        }
      );
    }
  }
  

  deleteItem(catIndex: number, subIndex: number, itemIndex: number): void {
    this.categories[catIndex].subcategories[subIndex].items.splice(itemIndex, 1);
  }

  getAllProductsList(){
    this.productSetupService.getAllProductsList().subscribe(products => {
      this.productList = products;
    });
  }

  onFileChange(event: Event, controlName: string): void {
    const input = event.target as HTMLInputElement;
    if (input?.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      if(controlName === "add2DMockupImage"){
        reader.onload = (e: ProgressEvent<FileReader>) => {
          const result = e.target?.result;
          if (result) {
            this.previewImages[controlName] = result;
          }
        };
        if (file) {
          this.productItemForm.patchValue({ [controlName]: file });
        }
        this.productItemForm.controls['isAllow7'].setValue(true);
      }  
  
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  }
  onFileChange2(event: Event, controlName: string): void {
    const input = event.target as HTMLInputElement;
    if (input?.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
   
      if(controlName === "add3DMockupImage"){
        reader.onload = (e: ProgressEvent<FileReader>) => {
          const result = e.target?.result;
          if (result) {
            this.previewImages2[controlName] = result;
          }
        };
        if (file) {
          this.productItemForm.patchValue({ [controlName]: file });
        }
        this.productItemForm.controls['isAllow9'].setValue(true);
      }    
  
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  }

  onFileChange3(event: Event, controlName: string): void {
    const input = event.target as HTMLInputElement;
    if (input?.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      if(controlName === "addSizeSpecsImage"){
        reader.onload = (e: ProgressEvent<FileReader>) => {
          const result = e.target?.result;
          if (result) {
            this.previewImages3[controlName] = result;
          }
        };
        if (file) {
          this.productItemForm.patchValue({ [controlName]: file });
        }
        this.productItemForm.controls['isAllow8'].setValue(true);
      }
     
  
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  }


  removeImage(controlName: string): void {
   
    if(controlName === "add2DMockupImage"){
      this.previewImages[controlName] = null;
      this.productItemForm.controls['isAllow7'].setValue(false);
    }if(controlName === "add3DMockupImage"){
      this.previewImages2[controlName] = null;
      this.productItemForm.controls['isAllow9'].setValue(false);
    }if(controlName === "addSizeSpecsImage"){
      this.previewImages3[controlName] = null;
      this.productItemForm.controls['isAllow8'].setValue(false);
    }
  }
}