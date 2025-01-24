import { SubCategoryModel } from "./sub-category.model";
import { ClientUserList } from "./user.model";

export interface ProductModel {
  productId: number;           // Represents the unique identifier for the product
  subCategoryId?: number;      // Optional: Represents the ID of the associated sub-category
  name?: string;               // Optional: Represents the name of the product
  code?: string;               // Optional: Represents a code associated with the product
  description?: string;        // Optional: Represents a description of the product
  isDefault?: boolean;         // Optional: Indicates if this is the default product
  active?: boolean;            // Optional: Indicates if the product is active
  status?: string;             // Optional: Represents the status of the product
  deleted?: boolean;           // Optional: Indicates if the product is deleted
  createdBy?: string;          // Optional: Represents the user who created the product
  createdDate?: Date;          // Optional: Represents the date when the product was created
  modifiedBy?: string;         // Optional: Represents the user who last modified the product
  modifiedDate?: Date;         // Optional: Represents the date when the product was last modified
  isNeck?: boolean;            // Optional: Indicates if the product has a neck
  isFrontDesc?: boolean;       // Optional: Indicates if the product has a front description
  isFrontImage?: boolean;      // Optional: Indicates if the product has a front image
  isBackDesc?: boolean;        // Optional: Indicates if the product has a back description
  isBackImage?: boolean;       // Optional: Indicates if the product has a back image
  isOnlyDesc?: boolean;        // Optional: Indicates if the product has only a description
  isLeftSleeveDesc?: boolean;  // Optional: Indicates if the product has a left sleeve description
  isRightSleeveDesc?: boolean; // Optional: Indicates if the product has a right sleeve description
  isLeftSleeveImage?: boolean; // Optional: Indicates if the product has a left sleeve image
  isRightSleeveImage?: boolean;// Optional: Indicates if the product has a right sleeve image
  frontImage?: string;         // Optional: Represents the front image of the product
  backImage?: string;          // Optional: Represents the back image of the product

   isAllow1?: boolean;
  isAllow2?: boolean;
  isAllow3?: boolean;
  isAllow4?: boolean;
  isAllow5?: boolean;
  isAllow6?: boolean;
  isAllow7?: boolean;
  isAllow8?: boolean;
  isAllow9?: boolean;
  isAllow10?: boolean;
  isAllow11?: boolean;
  isAllow12?: boolean;
  isAllow13?: boolean;
}

export interface TeamList{
  name : string;
  number : string;
  size:string;
  productSizeId:number;
  quantity:number;
}
export class ProductPriceListModel {
  priceListId: number;
  productId?: number;
  userId?: number;
  amount?: number;
  rushAmount?: number;
  discount?: number;
  description?: string;
  active?: boolean;
  deleted?: boolean;
  createdBy?: string;
  modifiedBy?: string;
  createdDate?: Date;
  modifiedDate?: Date;
  effectiveDate?: Date;
  endDate?: Date;

  product?: ProductModel;
  user?: ClientUserList;

  constructor(
    priceListId: number,
    productId?: number,
    userId?: number,
    amount?: number,
    rushAmount?: number,
    discount?: number,
    description?: string,
    active?: boolean,
    deleted?: boolean,
    createdBy?: string,
    modifiedBy?: string,
    createdDate?: Date,
    modifiedDate?: Date,
    effectiveDate?: Date,
    endDate?: Date,
    product?: ProductModel,
    user?: ClientUserList
  ) {
    this.priceListId = priceListId;
    this.productId = productId;
    this.userId = userId;
    this.amount = amount;
    this.rushAmount = rushAmount;
    this.discount = discount;
    this.description = description;
    this.active = active;
    this.deleted = deleted;
    this.createdBy = createdBy;
    this.modifiedBy = modifiedBy;
    this.createdDate = createdDate;
    this.modifiedDate = modifiedDate;
    this.effectiveDate = effectiveDate;
    this.endDate = endDate;
    this.product = product;
    this.user = user;
  }
}
export class GetProductPriceByUser {
  productId?: number;
  userId?: number;

  constructor(productId?: number, userId?: number) {
    this.productId = productId;
    this.userId = userId;
  }
}

export class SizePriceIdsRequest {
  prodSizeIds: number[];
  productId: number;

  constructor(prodSizeIds: number[], productId: number) {
    this.prodSizeIds = prodSizeIds;
    this.productId = productId;
  }
}

export class ProductSizesPriceListModel {
  sizePriceId: number;
  sizePriceHeaderId?: number;
  productSizeId?: number;
  amount?: number;
  discount?: number;

  constructor(
    sizePriceId: number,
    sizePriceHeaderId?: number,
    productSizeId?: number,
    amount?: number,
    discount?: number
  ) {
    this.sizePriceId = sizePriceId;
    this.sizePriceHeaderId = sizePriceHeaderId;
    this.productSizeId = productSizeId;
    this.amount = amount;
    this.discount = discount;
  }
}

export class AddEditProductModel {
  productId: number = 0;
  subCategoryId?: number;
  name?: string;
  code?: string;
  description?: string;
  isDefault?: boolean;
  active?: boolean;
  status?: string;
  deleted?: boolean;
  createdBy?: string;
  createdDate?: Date;
  modifiedBy?: string;
  modifiedDate?: Date;
  isNeck?: boolean;
  isFrontDesc?: boolean;
  //isFrontImage?: boolean;
  isBackDesc?: boolean;
  //isBackImage?: boolean;
  isOnlyDesc?: boolean;
  isLeftSleeveDesc?: boolean;
  isRightSleeveDesc?: boolean;
  //isLeftSleeveImage?: boolean;
  //isRightSleeveImage?: boolean;
  frontImage?: string;
  backImage?: string;

  isAllow1?: boolean;
  isAllow2?: boolean;
  isAllow3?: boolean;
  isAllow4?: boolean;
  isAllow5?: boolean;
  isAllow6?: boolean;
  isAllow7?: boolean;
  isAllow8?: boolean;
  isAllow9?: boolean;
  isAllow10?: boolean;
  isAllow11?: boolean;
  isAllow12?: boolean;
  isAllow13?: boolean;
  // isAllow14?: boolean;
  // isAllow15?: boolean;
  // isAllow16?: boolean;
  // isAllow17?: boolean;
  // isAllow18?: boolean;
  // isAllow19?: boolean;
  // isAllow20?: boolean;
  // isAllow21?: boolean;
  // isAllow22?: boolean;
  // isAllow23?: boolean;
  // isAllow24?: boolean;
  // isAllow25?: boolean;
  // isAllow26?: boolean;
  // isAllow27?: boolean;
  // isAllow28?: boolean;
  // isAllow29?: boolean;
  // isAllow30?: boolean;
  // isAllow31?: boolean;
  // isAllow32?: boolean;
  // isAllow33?: boolean;
  // isAllow34?: boolean;
  // isAllow35?: boolean;
  // isAllow36?: boolean;
  // isAllow37?: boolean;
  // isAllow38?: boolean;
  // isAllow39?: boolean;
  // isAllow40?: boolean;
  // isAllow41?: boolean;
  // isAllow42?: boolean;
  // isAllow43?: boolean;
  // isAllow44?: boolean;
  // isAllow45?: boolean;
  // isAllow46?: boolean;
  // isAllow47?: boolean;
  // isAllow48?: boolean;
  // isAllow49?: boolean;
  // isAllow50?: boolean;
  // isAllow51?: boolean;
  // isAllow52?: boolean;
  // isAllow53?: boolean;
  // isAllow54?: boolean;
  // isAllow55?: boolean;
  // isAllow56?: boolean;
  // isAllow57?: boolean;
  // isAllow58?: boolean;
  // isAllow59?: boolean;
  // isAllow60?: boolean;
  // isAllow61?: boolean;
  // isAllow62?: boolean;
  // isAllow63?: boolean;
  // isAllow64?: boolean;
  // isAllow65?: boolean;
}

export interface ProductsListModel {
  productId: number;
  //subCategoryId?: number;
  name?: string;
  // code?: string;
  // description?: string;
  // isDefault?: boolean;
  // active?: boolean;
  // status?: string;
  // deleted?: boolean;
  // createdBy?: string;
  // createdDate?: Date;
  // modifiedBy?: string;
  // modifiedDate?: Date;
  // isNeck?: boolean;
  // isFrontDesc?: boolean;
  // isFrontImage?: boolean;
  // isBackDesc?: boolean;
  // isBackImage?: boolean;
  // isOnlyDesc?: boolean;
  // isLeftSleeveDesc?: boolean;
  // isRightSleeveDesc?: boolean;
  // isLeftSleeveImage?: boolean;
  // isRightSleeveImage?: boolean;
  // frontImage?: string;
  // backImage?: string;
  // isAllow1?: boolean;
  // isAllow2?: boolean;
  // isAllow3?: boolean;
  // isAllow4?: boolean;
  // isAllow5?: boolean;
  // isAllow6?: boolean;
  // isAllow7?: boolean;
  // isAllow8?: boolean;
  // isAllow9?: boolean;
  // isAllow10?: boolean;
  // isAllow11?: boolean;
  // isAllow12?: boolean;
  // isAllow13?: boolean;
  // isAllow14?: boolean;
  // isAllow15?: boolean;
  // isAllow16?: boolean;
  // isAllow17?: boolean;
  // isAllow18?: boolean;
  // isAllow19?: boolean;
  // isAllow20?: boolean;
  // isAllow21?: boolean;
  // isAllow22?: boolean;
  // isAllow23?: boolean;
  // isAllow24?: boolean;
  // isAllow25?: boolean;
  // isAllow26?: boolean;
  // isAllow27?: boolean;
  // isAllow28?: boolean;
  // isAllow29?: boolean;
  // isAllow30?: boolean;
  // isAllow31?: boolean;
  // isAllow32?: boolean;
  // isAllow33?: boolean;
  // isAllow34?: boolean;
  // isAllow35?: boolean;
  // isAllow36?: boolean;
  // isAllow37?: boolean;
  // isAllow38?: boolean;
  // isAllow39?: boolean;
  // isAllow40?: boolean;
  // isAllow41?: boolean;
  // isAllow42?: boolean;
  // isAllow43?: boolean;
  // isAllow44?: boolean;
  // isAllow45?: boolean;
  // isAllow46?: boolean;
  // isAllow47?: boolean;
  // isAllow48?: boolean;
  // isAllow49?: boolean;
  // isAllow50?: boolean;
  // isAllow51?: boolean;
  // isAllow52?: boolean;
  // isAllow53?: boolean;
  // isAllow54?: boolean;
  // isAllow55?: boolean;
  // isAllow56?: boolean;
  // isAllow57?: boolean;
  // isAllow58?: boolean;
  // isAllow59?: boolean;
  // isAllow60?: boolean;
  // isAllow61?: boolean;
  // isAllow62?: boolean;
  // isAllow63?: boolean;
  // isAllow64?: boolean;
  // isAllow65?: boolean;
  subCategory?: SubCategoryModel;
}



