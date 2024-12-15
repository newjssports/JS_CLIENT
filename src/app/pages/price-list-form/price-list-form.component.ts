import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, AbstractControl } from '@angular/forms';
import { CategoryModel } from 'src/app/models/category.model';
import { FabricTypeModel } from 'src/app/models/fabric-type.model';
import { MainCategoryModel } from 'src/app/models/MainCategoryModel';
import { NeckStyleModel } from 'src/app/models/neck-style.model';
import { ProductModel } from 'src/app/models/product.model';
import { SubCategoryModel } from 'src/app/models/sub-category.model';
import { ClientUserList } from 'src/app/models/user.model';
import { ProductSetupService } from 'src/app/services/product-setup.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-price-list-form',
  templateUrl: './price-list-form.component.html',
  styleUrls: ['./price-list-form.component.scss']
})
export class PriceListFormComponent implements OnInit {
  priceListForm!: FormGroup;
  categories = CATEGORIES;
  subcategories: any[] = [];
  items: any[] = [];
  clientList: ClientUserList[]=[];
  mainCategories: MainCategoryModel[] = [];
  categoriesByMainId: CategoryModel[] = [];
  subCatByCateId: SubCategoryModel[] = [];
  products: ProductModel[]=[];
  fabrics: FabricTypeModel[]=[];
  neckStyles: NeckStyleModel[]=[];
  selectedProduct: ProductModel | null | undefined;
  constructor(private fb: FormBuilder,
    private productSetupService: ProductSetupService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.priceListForm = this.fb.group({
      maincategory: [''],
      category:[''],
      subcategory: [''],
      item: [[]],
      effectiveFrom: [''],
      endDate: [''],
      status: [''],
      items: this.fb.array([])
    });

    this.getClientUserList();
    this.getMainCategory();
    this.priceListForm.get('category')?.valueChanges.subscribe(categoryId => {
      this.getSubCategoryByCateId(categoryId);
      this.priceListForm.get('subcategory')?.setValue('');
      this.products = [];
    });

    this.priceListForm.get('subcategory')?.valueChanges.subscribe(subcategoryId => {
      if(subcategoryId){
        this.getProductBySubCateId(subcategoryId);
        this.priceListForm.get('item')?.setValue('');
      }
    });

    this.priceListForm.get('item')?.valueChanges.subscribe(value => {
      //let selectedProduuct = this.products.find(x => x.productId === value);
      this.updateItemsArray(value);
    });
  }

  
  getClientUserList(){
    this.userService.getClientUserList().subscribe(res => {
      this.clientList = res;
    });
  }
  getMainCategory(){
    this.productSetupService.getMainCategories().subscribe(categories => {
      this.mainCategories = categories;
      const defaultCategory = this.mainCategories.find(category => category.isDefault);
      if (defaultCategory) {
        this.priceListForm.get('maincategory')?.setValue(defaultCategory.mainCategoryId);
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

  get itemsArray(): FormArray {
    return this.priceListForm.get('items') as FormArray;
  }

  updateItemsArray(selectedItems: ProductModel[]): void {
    const itemsArray = this.priceListForm.get('items') as FormArray;
    itemsArray.clear();
    selectedItems.forEach(item => {
      itemsArray.push(this.fb.group({
        productId: [item.productId],
        name: [item.name],
        amount: [''],
        rushAmount: [''],
        discount: [''],
        client:['']
      }));
    });
  }

  submitForm(): void {
    console.log(this.priceListForm.value);
  }
  removeItem(index: number): void {
    this.itemsArray.removeAt(index);
  }
  getFormGroup(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }
}

export const CATEGORIES = [
  {
    category: "Men's Sportswear",
    subcategories: [
      {
        name: 'Tops',
        items: [
          'T-Shirts',
          'Long Sleeve Shirts',
          'Polo Shirts',
          'Hoodies',
          'Jackets'
        ]
      },
      {
        name: 'Bottoms',
        items: [
          'Shorts',
          'Sweatpants',
          'Track Pants',
          'Joggers'
        ]
      },
      {
        name: 'Footwear',
        items: [
          'Running Shoes',
          'Training Shoes',
          'Sports Sandals'
        ]
      },
      {
        name: 'Accessories',
        items: [
          'Hats',
          'Socks',
          'Bags'
        ]
      }
    ]
  },
  // Add more categories as needed
];
