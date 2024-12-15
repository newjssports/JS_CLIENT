import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UserMockupAction } from 'src/app/core/enums';
import { CategoryModel } from 'src/app/models/category.model';
import { FabricTypeModel } from 'src/app/models/fabric-type.model';
import { MainCategoryModel } from 'src/app/models/MainCategoryModel';
import { MockupDesignStepsUserRightsModel } from 'src/app/models/mockup-design-steps-user-rights.model';
import { MockupModel, MockupsListModel } from 'src/app/models/mockup.model';
import { NeckStyleModel } from 'src/app/models/neck-style.model';
import { ProductModel } from 'src/app/models/product.model';
import { SubCategoryModel } from 'src/app/models/sub-category.model';
import { MockupService } from 'src/app/services/mockup.service';
import { ProductSetupService } from 'src/app/services/product-setup.service';
import { UserRightsService } from 'src/app/services/user-rights.service';

@Component({
  selector: 'app-mockup-design',
  //standalone: true,
 // imports: [],
  templateUrl: './mockup-design.component.html',
  styleUrl: './mockup-design.component.scss'
})
export class MockupDesignComponent {
  mainCategories: MainCategoryModel[] = [];
  categoriesByMainId: CategoryModel[] = [];
  subCatByCateId: SubCategoryModel[] = [];
  products: ProductModel[]=[];
  fabrics: FabricTypeModel[]=[];
  neckStyles: NeckStyleModel[]=[];
  selectedProduct: ProductModel | null | undefined;
  //categories = CATEGORIES;
  form: FormGroup ;
  subcategories: any[] = [];
  items: string[] = [];
  frontImages: string[] = [];
  backImages: string[] = [];
  displayedColumns: string[] = ['name', 'category', 'subcategory', 'item'];
  dataSource = [
    { name: 'Sample Item 1', category: 'Men\'s Sportswear', subcategory: 'Tops', item: 'T-Shirt' },
    { name: 'Sample Item 2', category: 'Women\'s Sportswear', subcategory: 'Bottoms', item: 'Leggings' }
  ];

  orderItems: MockupModel[] = []; // Array to store the items added to the table
  displayedTblColumns: string[] = [];
  //displayedTblColumns: string[] = ['productName', 'fabricType', 'neckStyle', 'frontDesc','backDesc','additionalDetail'];

  addNewMockup : MockupModel;

  mockupDesignStepsUserRights : MockupDesignStepsUserRightsModel[] = [];
  isClient: boolean;
  mockupsList: MockupsListModel[] = [];
  mockupsListMoveToDesignDept: MockupsListModel[] = [];
  mockupsListAssignToDesigner: MockupsListModel[] = [];



  constructor(private fb: FormBuilder, private productSetupService: ProductSetupService,
   private mockupService: MockupService,
   private userRightsService: UserRightsService
  ) {
    this.form = this.fb.group({
      mockupId:[0],
      mockupName: [''],
      mockupCode: [''],
      mainCategoryId: [''],
      categoryId: [''],
      subCategoryId: [''],
      productId: [''],
      productName: [''],
      teamName: [''],
      fabricTypeId: [0],
      fabricType: [''],
      neckStyleId: [0],
      neckStyle: [''],
      frontDesc: [''],
      backDesc: [''],
      additionalDetail: [''],
      frontImages: this.fb.array([]),
      backImages: this.fb.array([])
    
    });
  }

  ngOnInit() {
    this.getUerMockupDesignActionRights();
    
    this.getMainCategory();
    this.updateDisplayedColumns();
    this.getFabricTypes();
    this.getNeckStyles();
    this.form.get('categoryId')?.valueChanges.subscribe(categoryId => {
      this.getSubCategoryByCateId(categoryId);
      this.form.get('subCategoryId')?.setValue('');
      this.products = [];
    });

    this.form.get('subCategoryId')?.valueChanges.subscribe(subcategoryId => {
      if(subcategoryId){
        this.getProductBySubCateId(subcategoryId);
        this.form.get('productId')?.setValue('');
      }
    });
    this.form.get('productId')?.valueChanges.subscribe(productId => {
      if(productId){
        this.selectedProduct = this.products.find(x => x.productId === productId);
        this.updateDisplayedColumns();
        
      }
    });

    this.getMockupsClientRequest();
    this.getMockupsMoveToDesigningDepartment();
  }

  getUerMockupDesignActionRights(){
    this.userRightsService.getUerMockupDesignActionRights().subscribe(res => {
      if(res){
        this.mockupDesignStepsUserRights = res;
        if(this.mockupDesignStepsUserRights.length > 0){
          for(let right of this.mockupDesignStepsUserRights){
            if(right.mockupSteps?.fromMockupDesignStep?.name === UserMockupAction.CLIENT){
              this.isClient = true;
            }else{
              this.isClient = false;
            }
          }
        }
      }
    });
  }

  updateDisplayedColumns() {
    this.displayedTblColumns = ['productName', 'fabricType', 'neckStyle', 'frontDesc','frontImages', 'backDesc',  'backImages'];
  
    if (this.selectedProduct?.isOnlyDesc) {
      console.log("this.selectedProduct?.isOnlyDesc ",this.selectedProduct?.isOnlyDesc);
      
      this.displayedTblColumns.push('additionalDetail');
    }
  }

  getMainCategory(){
    this.productSetupService.getMainCategories().subscribe(categories => {
      this.mainCategories = categories;
      const defaultCategory = this.mainCategories.find(category => category.isDefault);
      if (defaultCategory) {
        this.form.get('mainCategoryId')?.setValue(defaultCategory.mainCategoryId);
        this.getCategoryByMainId(defaultCategory.mainCategoryId);
      }
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
  getProductBySubCateId(id: number){
    this.productSetupService.getProductBySubCateId(id).subscribe(product => {
      this.products = product;
    });
  }
  getFabricTypes(){
    this.productSetupService.getFabricTypes().subscribe(res =>{
      this.fabrics = res;
    });
  }
  getNeckStyles(){
    this.productSetupService.getNeckStyles().subscribe(res =>{
      this.neckStyles = res;
    });
  }
  onFileSelected(event: any, side: 'front' | 'back' = 'front') {
    const files = event.target.files;
    for (let file of files) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (side === 'front') {
          this.frontImages.push(e.target.result);
        } else {
          this.backImages.push(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  }
  removeFrontImage(image: string) {
    this.frontImages = this.frontImages.filter(img => img !== image);
  }
  removeBackImage(image: string) {
    this.backImages = this.backImages.filter(img => img !== image);
  }
  addItemToTable() {
    const formValue = this.form.value;

   // Construct the new item
const newItem: MockupModel = {
  mockupId: 0, // Assuming a default value as it's not provided by formValue
  //mockupName: formValue.mockupName || "",
  //mockupCode: formValue.mockupCode || "",
  mainCategoryId: formValue.mainCategoryId,
  categoryId: formValue.categoryId,
  subCategoryId: formValue.subCategoryId,
  productId: formValue.productId,
  productName: this.getProductName(formValue.productId),
  teamName: formValue.teamName,
  fabricTypeId: formValue.fabricTypeId,
  fabricType: this.getFabricName(formValue.fabricTypeId),
  neckStyleId: formValue.neckStyleId,
  neckStyle: this.getNeckStyleName(formValue.neckStyleId),
  frontDescription: formValue.frontDesc,
  backDescription: formValue.backDesc,
  leftSleeveDesc: formValue.leftSleeveDesc || '', // Optional if applicable
  rightSleeveDesc: formValue.rightSleeveDesc || '', // Optional if applicable
  additionalDetail: formValue.additionalDetail,
  frontImages: [...this.frontImages],
  backImages: [...this.backImages]
};

// Add the new item to the orderItems array
this.orderItems.push(newItem);
    // Force table update by assigning a new array
    this.orderItems = [...this.orderItems];
    // Clear images and reset form fields
    this.frontImages = [];
    this.backImages = [];
    // Optionally, reset the form fields while keeping some intact
    this.form.patchValue({
      item: '',
      fabricType: '',
      neckStyle: '',
      frontDesc: '',
      backDesc: '',
      additionalDetail: ''
    });

    console.log("TABLE :", this.orderItems);
    
  }

  // getFrontImages(): FormArray {
  //   return this.form.get('frontImages') as FormArray;
  // }

  // getBackImages(): FormArray {
  //   return this.form.get('backImages') as FormArray;
  // }
  // addFrontImage(image: string): void {
  //   this.frontImages.push(new FormControl(image));
  // }

  // addBackImage(image: string): void {
  //   this.backImages.push(new FormControl(image));
  // }
  getCategoryName(id: number): string {
    const category = this.mainCategories.find(cat => cat.mainCategoryId === id);
    return category?.name || '';
  }
  
  getSubCategoryName(id: number): string {
    const subcategory = this.subCatByCateId.find(sub => sub.subCategoryId === id);
    return subcategory?.name || ''; 
  }
  getProductName(id: number): string {
    const product = this.products.find(prod => prod.productId === id);
    return product?.name || '';
  }
  getFabricName(id: number): string {
    const product = this.fabrics.find(prod => prod.fabricTypeId === id);
    return product?.fabricTypeName || '';
  }
  getNeckStyleName(id: number): string {
    const product = this.neckStyles.find(prod => prod.neckStyleId === id);
    return product?.neckStyleName || '';
  }
  setSelectedProduct(product: any) {
    this.selectedProduct = product;
    this.updateDisplayedColumns();
  }
  
  submitOrder(fromActionName: string,toActionName: string) {
    // Logic to submit the order items
    //console.log('Order submitted:', this.orderItems);

    
    if (this.form.valid) {
      if(fromActionName === UserMockupAction.CLIENT && toActionName === UserMockupAction.ADMIN){
        console.log('fromActionName :', fromActionName);
        console.log('toActionName :', toActionName);

        this.mockupService.addNewMockup(this.orderItems).subscribe(response => {
          console.log('Mockup submitted successfully', response);
        }, error => {
          console.error('Error submitting mockup', error);
        });
      }else if(fromActionName === UserMockupAction.ADMIN && toActionName === UserMockupAction.DESIGNING_DEPT){
        console.log('fromActionName :', fromActionName);
        console.log('toActionName :', toActionName);


      }else if(fromActionName === UserMockupAction.DESIGNING_DEPT && toActionName === UserMockupAction.DESIGNER){
        console.log('fromActionName :', fromActionName);
        console.log('toActionName :', toActionName);


      }
      
    }
  }


  getMockupsClientRequest(){
    this.mockupService.getMockupsClientRequest().subscribe(res =>{
      if(res){
        this.mockupsList = [];
        this.mockupsList = res;
      }
    });
  }

  getMockupsMoveToDesigningDepartment(){
    this.mockupService.getMockupsMoveToDesigningDepartment().subscribe(res =>{
      if(res){
        this.mockupsListMoveToDesignDept = [];
        this.mockupsListMoveToDesignDept = res;
      }
    });
  }

  getMockupsAssignToDesigner(){
    this.mockupService.getMockupsAssignToDesigner().subscribe(res =>{
      if(res){
        this.mockupsListAssignToDesigner = [];
        this.mockupsListAssignToDesigner = res;
      }
    });
  }
  
}

