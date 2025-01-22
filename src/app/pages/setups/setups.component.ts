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
      isFrontImage: [false],
      isBackDesc: [false],
      isBackImage: [false],
      isOnlyDesc: [false],
      isLeftSleeveDesc: [false],
      isRightSleeveDesc: [false],
      isLeftSleeveImage: [false],
      isRightSleeveImage: [false],
      frontImage: [''],
      backImage: [''],

      isAllow_1: [false],
      isAllow_2: [false],
      isAllow_3: [false],
      isAllow_4: [false],
      isAllow_5: [false],
      isAllow_6: [false],
      isAllow_7: [false],
      isAllow_8: [false],
      isAllow_9: [false],
      isAllow_10: [false],
      isAllow_11: [false],
      isAllow_12: [false],
      isAllow_13: [false],
      isAllow_14: [false],
      isAllow_15: [false],
      isAllow_16: [false],
      isAllow_17: [false],
      isAllow_18: [false],
      isAllow_19: [false],
      isAllow_20: [false],
      isAllow_21: [false],
      isAllow_22: [false],
      isAllow_23: [false],
      isAllow_24: [false],
      isAllow_25: [false],
      isAllow_26: [false],
      isAllow_27: [false],
      isAllow_28: [false],
      isAllow_29: [false],
      isAllow_30: [false],
      isAllow_31: [false],
      isAllow_32: [false],
      isAllow_33: [false],
      isAllow_34: [false],
      isAllow_35: [false],
      isAllow_36: [false],
      isAllow_37: [false],
      isAllow_38: [false],
      isAllow_39: [false],
      isAllow_40: [false],
      isAllow_41: [false],
      isAllow_42: [false],
      isAllow_43: [false],
      isAllow_44: [false],
      isAllow_45: [false],
      isAllow_46: [false],
      isAllow_47: [false],
      isAllow_48: [false],
      isAllow_49: [false],
      isAllow_50: [false],
      isAllow_51: [false],
      isAllow_52: [false],
      isAllow_53: [false],
      isAllow_54: [false],
      isAllow_55: [false],
      isAllow_56: [false],
      isAllow_57: [false],
      isAllow_58: [false],
      isAllow_59: [false],
      isAllow_60: [false],
      isAllow_61: [false],
      isAllow_62: [false],
      isAllow_63: [false],
      isAllow_64: [false],
      isAllow_65: [false],


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

  addItem(): void {
    if (this.productItemForm.valid) {
        const addProduct: AddEditProductModel = this.productItemForm.getRawValue();
        this.productSetupService.addEditProductItem(addProduct).subscribe(
          response => {
            //console.log('Product Added successfully', response);
            this._snackBar.open('Product Added successfully', 'X', {
              duration: 3000
            });
            // Handle successful registration
          },
          error => {
            //console.error('Error add product', error);
            this._snackBar.open('Error product not added!', 'X', {
              duration: 3000
            });
            // Handle error
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
}