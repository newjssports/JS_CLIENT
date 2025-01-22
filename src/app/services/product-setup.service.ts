import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MainCategoryModel } from '../models/MainCategoryModel';
import { CategoryModel } from '../models/category.model';
import { SubCategoryModel } from '../models/sub-category.model';
import { AddEditProductModel, GetProductPriceByUser, ProductModel, ProductSizesPriceListModel, ProductsListModel, SizePriceIdsRequest } from '../models/product.model';
import { FabricTypeModel } from '../models/fabric-type.model';
import { NeckStyleModel } from '../models/neck-style.model';
import { ProductSizeList } from '../models/product-size-list.model';
import { ApprovedMockupModel } from '../models/approved-mockups.model';

@Injectable({
  providedIn: 'root'
})
export class ProductSetupService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getMainCategories(): Observable<MainCategoryModel[]> {
    return this.http.get<MainCategoryModel[]>(this.apiUrl+"MainCategory/getMainCategory");
  }

  getCategoryByMainId(id: number): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel[]>(this.apiUrl+"Category/getCategoryByMainId?mainCatId="+ id);
  }

  getSubCategoryByCateId(id: number): Observable<SubCategoryModel[]> {
    return this.http.get<SubCategoryModel[]>(this.apiUrl+"SubCategory/getSubCategoryBySubCatId?id="+ id);
  }
  getProductBySubCateId(id: number): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(this.apiUrl+"Product/getProductBySubCateId?id="+ id);
  }
  getFabricTypes(): Observable<FabricTypeModel[]> {
    return this.http.get<FabricTypeModel[]>(this.apiUrl+"FabricType/getFabricTypes");
  }
  getNeckStyles(): Observable<NeckStyleModel[]> {
    return this.http.get<NeckStyleModel[]>(this.apiUrl+"NeckStyle/getNeckStyles");
  }

  getProductSizes(): Observable<ProductSizeList[]> {
    return this.http.get<ProductSizeList[]>(this.apiUrl+"ProductSizeList/getProductSizes");
  }

  getProductPriceByUser(model: GetProductPriceByUser): Observable<any> {
    return this.http.post<any>(this.apiUrl+"Product/getProductPriceListByUser", model);
  }

  getProductSizesPriceList(model: SizePriceIdsRequest): Observable<ProductSizesPriceListModel[]> {
    return this.http.post<any>(this.apiUrl+"ProductSizeList/getProductSizesPriceList", model);
  }

  addEditProductItem(model: AddEditProductModel): Observable<any> {
      return this.http.post<any>(this.apiUrl+"Product/addEditProduct", model);
    }

    getAllProductsList(): Observable<ProductsListModel[]> {
      return this.http.get<ProductsListModel[]>(this.apiUrl+"Product/getAllProducts");
    }

}
