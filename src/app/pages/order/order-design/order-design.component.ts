import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { UserMockupAction } from 'src/app/core/enums';
import { ApprovedMockupModel } from 'src/app/models/approved-mockups.model';
import { CategoryModel } from 'src/app/models/category.model';
import { FabricTypeModel } from 'src/app/models/fabric-type.model';
import { MainCategoryModel } from 'src/app/models/MainCategoryModel';
import { MockupDesignStepsUserRightsModel } from 'src/app/models/mockup-design-steps-user-rights.model';
import { MockupModel, MockupsListModel, NewOrderRequest } from 'src/app/models/mockup.model';
import { NeckStyleModel } from 'src/app/models/neck-style.model';
import { ProductSizeList } from 'src/app/models/product-size-list.model';
import { GetProductPriceByUser, ProductModel, ProductPriceListModel, ProductSizesPriceListModel, TeamList } from 'src/app/models/product.model';
import { SubCategoryModel } from 'src/app/models/sub-category.model';
import { ImageService } from 'src/app/services/image.service';
import { MockupService } from 'src/app/services/mockup.service';
import { ProductSetupService } from 'src/app/services/product-setup.service';
import { UserRightsService } from 'src/app/services/user-rights.service';
import * as XLSX from 'xlsx'; // Import xlsx library

@Component({
  selector: 'app-order-design',
  templateUrl: './order-design.component.html',
  styleUrl: './order-design.component.scss'
})
export class OrderDesignComponent implements OnInit {
  //form: FormGroup;
  categories = [
    { category: 'Jersey', subcategories: ['Home', 'Away'] },
    { category: 'Shorts', subcategories: ['Training', 'Match'] },
    // Add more categories as needed
  ];
  //subcategories: string[] = []; // Explicitly declare the type
  //items: string[] = []; // Explicitly declare the type
  //sizes = ['S', 'M', 'L', 'XL', 'XXL'];
  //frontImages: string[] = [];
  //backImages: string[] = [];
  teamForm: FormGroup;
  teamList: TeamList[] = [];
  //sizes = ['XL', 'XXL', 'XXXL'];

  //dataSource = new MatTableDataSource<any>();
  //displayedColumns: string[] = ['name', 'category', 'subcategory', 'item'];

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

  orderItems: NewOrderRequest[] = []; // Array to store the items added to the table
  displayedTblColumns: string[] = [];
  //displayedTblColumns: string[] = ['productName', 'fabricType', 'neckStyle', 'frontDesc','backDesc','additionalDetail'];

  addNewMockup : MockupModel;

  mockupDesignStepsUserRights : MockupDesignStepsUserRightsModel[] = [];
  isClient: boolean;
  mockupsList: MockupsListModel[] = [];
  mockupsListMoveToDesignDept: MockupsListModel[] = [];
  mockupsListAssignToDesigner: MockupsListModel[] = [];

  approvedMockups: ApprovedMockupModel[] = [];
  displayedTeamColumns: string[] = ['name', 'number', 'size','quant', 'actions'];
  productSizes : ProductSizeList[] = [];

  selectedFile: File | null = null;
  uploadedImagePath: string | null = null;
  productPriceListData: ProductPriceListModel;
  isRushOrder: boolean = false;
  constructor(private fb: FormBuilder, private productSetupService: ProductSetupService,
    private mockupService: MockupService,
    private userRightsService: UserRightsService,
    private imageService: ImageService) {}

  ngOnInit(): void {
    this.getApprovedMockups();
    this.form = this.fb.group({
      mockupId:[0],
      isRushOrder:[false],
      mainCategoryId: [0],
      categoryId: [0],
      subCategoryId: [0],
      productId: [0],
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

    this.teamForm = this.fb.group({
      name: [''],
      number: [''],
      productSizeId:['', Validators.required],
      quantity: [1],
      size: [''],
    });
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
    // this.form.get('productId')?.valueChanges.subscribe(productId => {    
    //   if (productId) {
       
    //     this.onProductChange(productId);
    //   }
    // });

    this.getMockupsClientRequest();
    this.getProductSizes();
    // const categoryControl = this.form.get('category');
    // if (categoryControl) {
    //   categoryControl.valueChanges.subscribe((value) => {
    //     this.onCategoryChange(value);
    //   });
    // }

    // const subcategoryControl = this.form.get('subcategory');
    // if (subcategoryControl) {
    //   subcategoryControl.valueChanges.subscribe((value) => {
    //     this.onSubcategoryChange(value);
    //   });
    // }
  }

  isRushOrderRequest(event: boolean){
  
    if(event){
      this.isRushOrder = event;
    }else{
      this.isRushOrder = false;
    }
  }
  addToTeamTable() {
    if (this.teamForm.valid) {
      let team = this.teamForm.value;
      team.size = this.productSizes.find(a => a.productSizeId === team.productSizeId)?.name;
      this.teamList.push(team);
      this.teamList = [...this.teamList]; 
      this.teamForm.reset();
    }
  }
  removeFromTeamTable(index: number) {
    this.teamList.splice(index, 1);
    this.teamList = [...this.teamList]; 
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
    this.displayedTblColumns = ['productName', 'fabricType', 'neckStyle'];
  
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
      let productId = this.form.get("productId")?.value;
      if(productId > 0){
        this.selectedProduct = this.products.find(x => x.productId === productId);
      }
      
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
  // onFileSelected(event: any, side: 'front' | 'back' = 'front') {
  //   const files = event.target.files;
  //   for (let file of files) {
  //     const reader = new FileReader();
  //     reader.onload = (e: any) => {
  //       if (side === 'front') {
  //         this.frontImages.push(e.target.result);
  //       } else {
  //         this.backImages.push(e.target.result);
  //       }
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }
  removeFrontImage(image: string) {
    this.frontImages = this.frontImages.filter(img => img !== image);
  }
  removeBackImage(image: string) {
    this.backImages = this.backImages.filter(img => img !== image);
  }

  // createOrderRow(): FormGroup {
  //   return this.fb.group({
  //     name: [''],
  //     number: [''],
  //     size: [''],
  //   });
  // }

  // addRow(): void {
  //   this.orderRows.push(this.createOrderRow());
  // }

  removeRow(index: number): void {
    this.orderRows.removeAt(index);
  }

  get orderRows(): FormArray {
    return this.form.get('orderRows') as FormArray;
  }

  onCategoryChange(category: string): void {
    const selectedCategory = this.categories.find((c) => c.category === category);
    this.subcategories = selectedCategory ? selectedCategory.subcategories : [];
    this.form.get('subcategory')?.setValue('');
    this.items = []; // Ensure items is reset
  }

  // onSubcategoryChange(subcategory: string): void {
  //   // Example items per subcategory, you can replace with real data
  //   if (subcategory === 'Home') {
  //     this.items = ['Home Jersey 1', 'Home Jersey 2'];
  //   } else if (subcategory === 'Away') {
  //     this.items = ['Away Jersey 1', 'Away Jersey 2'];
  //   } else if (subcategory === 'Training') {
  //     this.items = ['Training Shorts 1', 'Training Shorts 2'];
  //   } else if (subcategory === 'Match') {
  //     this.items = ['Match Shorts 1', 'Match Shorts 2'];
  //   }
  //   this.form.get('item')?.setValue([]);
  // }

  // onFileSelected(event: any, side: string): void {
  //   const files = event.target.files;
  //   for (let file of files) {
  //     const reader = new FileReader();
  //     reader.onload = (e: any) => {
  //       if (side === 'front') {
  //         this.frontImages.push(e.target.result);
  //       } else {
  //         this.backImages.push(e.target.result);
  //       }
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }

  // removeFrontImage(image: string): void {
  //   this.frontImages = this.frontImages.filter((img) => img !== image);
  // }

  // removeBackImage(image: string): void {
  //   this.backImages = this.backImages.filter((img) => img !== image);
  // }

  onSubmit(): void {
    const formData = this.form.value;
    console.log('Form Data:', formData);

    const orderData = {
      name: formData.teamName,
      category: formData.category,
      subcategory: formData.subcategory,
      item: formData.item,
    };

    // Append the form data to the grid
    //this.dataSource.data = [...this.dataSource.data, orderData];
  }

  
  getMockupsClientRequest(){
    this.mockupService.getMockupsClientRequest().subscribe(res =>{
      if(res){
        this.mockupsList = res;
      }
    });
  }

  getMockupsMoveToDesigningDepartment(){
    this.mockupService.getMockupsMoveToDesigningDepartment().subscribe(res =>{
      if(res){
        this.mockupsList = res;
      }
    });
  }

  getMockupsAssignToDesigner(){
    this.mockupService.getMockupsAssignToDesigner().subscribe(res =>{
      if(res){
        this.mockupsList = res;
      }
    });
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

  addItemToTable() {
    const formValue = this.form.value;
    var productUser = {
      productId : formValue.productId,
      userId: 2 // Will Change
    }
    let sizesIds: number[] = [];
    for(let id of this.teamList){
      sizesIds.push(id.productSizeId);
    } 
    
    var sizesListReq ={
      prodSizeIds: sizesIds,
      productId: formValue.productId,
    }

    this.productSetupService.getProductPriceByUser(productUser).subscribe((res : ProductPriceListModel) => {
      if(res){
        var PRODUCT_PRICE = 0;
        var PRODUCT_RUSH_PRICE = 0 ;
        var PRODUCT_SIZES_PRICE;
        var PRODUCT_SIZES_QUANTITY;
        var TOTAL_AMMOUNT;
        if (res.amount !== undefined && res.rushAmount !== undefined) {
          PRODUCT_PRICE = res.amount;
          PRODUCT_RUSH_PRICE = res.rushAmount;
        }
        
        this.productSetupService.getProductSizesPriceList(sizesListReq).subscribe((data:ProductSizesPriceListModel[]) => {
          if(data){
            
            PRODUCT_SIZES_PRICE = 0;
            for(let i of data){
              debugger
              var size_Quantity =  this.teamList.find(x => x.productSizeId === i.productSizeId)?.quantity;
              if (i.amount !== undefined && size_Quantity !== undefined) {
                console.log(" i.amount | size_Quantity : ",i.amount , size_Quantity);
                
                PRODUCT_SIZES_PRICE += (i.amount*size_Quantity);
              }
            }
            if(this.isRushOrder){
              TOTAL_AMMOUNT = PRODUCT_PRICE+PRODUCT_SIZES_PRICE+PRODUCT_RUSH_PRICE;
            }else{
              TOTAL_AMMOUNT = PRODUCT_PRICE+PRODUCT_SIZES_PRICE;
            }
           

               // Construct the new item
const newItem: NewOrderRequest = {
  mockupId: 0, // Assuming a default value as it's not provided by formValue
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
  backImages: [...this.backImages],
  productPrice: PRODUCT_PRICE,
  productSizePrice : PRODUCT_SIZES_PRICE,
  rushPrice: PRODUCT_RUSH_PRICE,
  totalAmount: TOTAL_AMMOUNT
};

// Add the new item to the orderItems array
this.orderItems.push(newItem);
    // Force table update by assigning a new array
    this.orderItems = [...this.orderItems];
    // Clear images and reset form fields
    //this.frontImages = [];
    //this.backImages = [];
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
        });
      }
    });

    
    
   


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
 getApprovedMockups()
 {
    this.mockupService.getApprovedMockups().subscribe(res =>{
      this.approvedMockups = res;
    });
  }

  onMockupChange(mockupId: number): void {
    const selectedMockup = this.approvedMockups.find(mockup => mockup.mockupId === mockupId);

    if (selectedMockup) {
      this.form.patchValue({
        mainCategoryId: selectedMockup.mainCategoryId || 0,
        categoryId: selectedMockup.categoryId || 0,
        subCategoryId: selectedMockup.subCategoryId || 0,
        productId: selectedMockup.productId || 0,
        teamName: selectedMockup.teamName || '',
        fabricTypeId: selectedMockup.fabricTypeId || 0,
        neckStyleId: selectedMockup.neckStyleId || 0,
        frontDesc: selectedMockup.frontDescription || '',
        backDesc: selectedMockup.backDescription || '',
        additionalDetail: '' // Assuming this field needs to be empty
      });
      // Disable all fields except 'mockupId'
    // Object.keys(this.form.controls).forEach(field => {
    //   if (field !== 'mockupId') {
    //     this.form.get(field)?.disable();
    //   }
    // });
    }
  }

  getProductSizes(){
    this.productSetupService.getProductSizes().subscribe(res => {
      this.productSizes = res;
    });
  }
  // onProductChange(productId: number): void {
  //   // this.form.get("subCategoryId")?.valueChanges.subscribe(res =>{
  //   //   this.getProductBySubCateId(res);
  //   // });
    
    
    
  //   console.log("products : ",this.products);
  //   if(this.products.length > 0 ){
  //     this.selectedProduct = this.products.find(x => x.productId === productId);
  //     if (this.selectedProduct) {
  //       console.log("CHANGE", productId);
  //       this.updateDisplayedColumns();
  //     }
  //   }
    
  // }

  // Handle file upload and read Excel file
  onFileChange(event: any) {
    const target: DataTransfer = <DataTransfer>(event.target);

    if (target.files.length !== 1) {
      console.error('Cannot upload multiple files on input.');
      return;
    }

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      // Get first sheet
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      // Convert sheet to JSON
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });

      // Process the data and map it to your table format
      this.processExcelData(data);
    };
    reader.readAsBinaryString(target.files[0]);
  }

  // Process the Excel data and push to the teamList array
  processExcelData(data: any) {
    this.teamList = [];
    
    // Skip header row and process each row
    data.slice(1).forEach((row: any) => {
      if (row.length >= 3) {
        const team = {
          name: row[0],     // Assuming 'Name' is the first column
          number: row[1],   // Assuming 'Number' is the second column
          size: row[2],      // Assuming 'Size' is the third column
          quantity: row[3],
          productSizeId: row[4], 
        };
        this.teamList.push(team);
      }
    });
  }

  onFileSelected(event: any, side: string): void {
    this.selectedFile = event.target.files[0];
  }

  onUpload(): void {
    if (this.selectedFile) {
      this.imageService.uploadImage(this.selectedFile).subscribe((response) => {
        this.uploadedImagePath = response.imagePath;
      });
    }
  }
}



interface OrderRow {
  name: string;
  number: string;
  size: string;
}