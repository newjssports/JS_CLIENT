import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryModel } from 'src/app/models/category.model';
import { MainCategoryModel } from 'src/app/models/MainCategoryModel';
import { MockupDesignStepsNameModel } from 'src/app/models/mockup-design-steps-name.model';
import { MockupDesignStepsModel } from 'src/app/models/mockup-design-steps.model';
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

  mockupDesignNames : MockupDesignStepsNameModel[] = [];
  mockupDesignedNames : MockupDesignStepsNameModel[] = [];

  mockupDesignSteps: MockupDesignStepsModel[] = [];
  numbers: number[] = [];
  constructor(private fb: FormBuilder, private productSetupService: ProductSetupService
    ,private mockupService : MockupService
  ) {}

  ngOnInit(): void {
    this.getMainCategory();
    this.getCategoryByMainId(1);
    this.getMockupDesignNames();
    this.getMockupCreatedDesignedNames();
    this.getMockupDesignSteps();
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
      backImage: ['']
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
    if (this.selectedCategoryIndex !== null && this.selectedSubCategoryIndex !== null) {
      this.categories[this.selectedCategoryIndex].subcategories[this.selectedSubCategoryIndex].items.push(
        this.productItemForm.value.item
      );
      this.productItemForm.reset();
    }
  }

  deleteItem(catIndex: number, subIndex: number, itemIndex: number): void {
    this.categories[catIndex].subcategories[subIndex].items.splice(itemIndex, 1);
  }
}