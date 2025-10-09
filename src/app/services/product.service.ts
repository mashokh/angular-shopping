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

  getProductList(categoryId : number) : Observable<Product[]> {
    const search = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`
    return this.httpClient.get<GetResponseProducts> (search).pipe(
      map(response => response._embedded.products)
    );
  }

  getProductCategories() : Observable<ProductCategory[]> {
    const search = `${this.categoryUrl}`
    return this.httpClient.get<GetResponseProductCategories> (search).pipe(
      map(response => response._embedded.productCategory)
    );
  }

  searchProducts(theKeyWord: string) : Observable<Product[]> {
    const search = `${this.baseUrl}/search/findByNameContaining?name=${theKeyWord}`
    return this.httpClient.get<GetResponseProducts> (search).pipe(
      map(response => response._embedded.products)
    );
  }
  
  searchProductDetails(id: number) : Observable<Product> {
    const search = `${this.baseUrl}/${id}`
    return this.httpClient.get<Product>(search);
  }
}

interface GetResponseProducts{
  _embedded:{
    products: Product[];
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
