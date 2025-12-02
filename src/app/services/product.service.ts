import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  private baseUrl = 'http://localhost:8080/api/products';
  private categoryUrl = 'http://localhost:8080/api/product-category';
  constructor(private httpClient: HttpClient) { }


  getProductCategories() : Observable<ProductCategory[]> {
    const search = `${this.categoryUrl}`
    return this.httpClient.get<GetResponseProductCategories> (search).pipe(
      map(response => response._embedded.productCategory)
    );
  }
  
  searchProductDetails(id: number) : Observable<Product> {
    const search = `${this.baseUrl}/${id}`
    return this.httpClient.get<Product>(search);
  }

  getProductListPaginate(thePage: number, thePageSize: number, theCategoryId: number): Observable<GetResponseProducts> {
    const search =  `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}&page=${thePage}&size=${thePageSize}`
    return this.httpClient.get<GetResponseProducts>(search);
  }

  
  getSearchProductListPaginate(thePage: number, thePageSize: number, theKeyWord: string): Observable<GetResponseProducts> {
    const search =  `${this.baseUrl}/search/findByNameContaining?name=${theKeyWord}&page=${thePage}&size=${thePageSize}`
    return this.httpClient.get<GetResponseProducts>(search);
  }
}

interface GetResponseProducts{
  _embedded:{
    products: Product[];
  }
  page : {
    size:number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}
interface GetResponseProductCategories{
  _embedded:{
    productCategory: ProductCategory[];
  }
}

interface GetResponseProduct{
  _embedded:{
    product: Product;
  }
}
