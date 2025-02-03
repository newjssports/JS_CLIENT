import { CategoryModel } from "./category.model";
import { FabricTypeModel } from "./fabric-type.model";
import { MainCategoryModel } from "./MainCategoryModel";
import { NeckStyleModel } from "./neck-style.model";
import { ProductModel } from "./product.model";
import { SubCategoryModel } from "./sub-category.model";
import { ClientUserList } from "./user.model";

export class MockupModel {
    mockupId: number = 0;
    //mockupName: string;
    //mockupCode: string;
    mainCategoryId: number = 0;
    categoryId: number = 0;
    subCategoryId: number = 0;
    productId: number = 0;
    productName: string = '';
    teamName: string = '';
    fabricTypeId: number = 0;
    fabricType: string = '';
    neckStyleId: number = 0;
    neckStyle: string = '';
    frontDescription: string = '';
    backDescription: string = '';
    leftSleeveDesc: string = '';
    rightSleeveDesc: string = '';
    additionalDetail: string = '';
    frontImages: string[] = [];
    backImages: string[] = [];
  }

  export class MockupsListModel {
    mockupId: number;
    teamName?: string;
    mainCategoryId?: number;
    categoryId?: number;
    subCategoryId?: number;
    productId?: number;
    fabricTypeId?: number;
    neckStyleId?: number;
    frontDescription?: string;
    backDescription?: string;
    leftSleeveDesc?: string;
    rightSleeveDesc?: string;
    active?: boolean;
    status?: string;
    deleted?: boolean;
    createdBy?: string;
    createdDate?: Date;
    modifiedBy?: string;
    modifiedDate?: Date;
    userId?: number;
    onlyDesc?: string;
    mockupName: string;
    mockupCode: string;
    // Related models
    category?: CategoryModel;
    fabricType?: FabricTypeModel;
    mainCategory?: MainCategoryModel;
    neckStyle?: NeckStyleModel;
    product?: ProductModel;
    subCategory?: SubCategoryModel;
    user?: ClientUserList;
  
    // For future use, if needed
    // mockupAttachments?: JsTblMockupAttachment[];
  }

  export class NewOrderRequest {
    mockupId: number = 0;
    mainCategoryId: number = 0;
    categoryId: number = 0;
    subCategoryId: number = 0;
    productId: number = 0;
    productName: string = '';
    teamName: string = '';
    fabricTypeId: number = 0;
    fabricType: string = '';
    neckStyleId: number = 0;
    neckStyle: string = '';
    frontDescription: string = '';
    backDescription: string = '';
    leftSleeveDesc: string = '';
    rightSleeveDesc: string = '';
    additionalDetail: string = '';
    frontImages: string[] = [];
    backImages: string[] = [];
    productPrice: number;
    rushPrice:number;
    productSizePrice: number;
    totalAmount: number;
  }

  export class WrestlingSingletModel {
    wrestlingSingletId: number;
    wrestlingSingletName?: string;
    wrestlingSingletDesc?: string;
  
    constructor(init?: Partial<WrestlingSingletModel>) {
      Object.assign(this, init);
    }
  }
  
  export class ShortPocketModel {
    shortPocketId: number;
    shortPocketName?: string;
    shortPocketDesc?: string;
  
    constructor(init?: Partial<ShortPocketModel>) {
      Object.assign(this, init);
    }
  }
  
  export class PantPocketModel {
    pantPocketId: number;
    pantPocketName?: string;
    pantPocketDesc?: string;
  
    constructor(init?: Partial<PantPocketModel>) {
      Object.assign(this, init);
    }
  }
  
  