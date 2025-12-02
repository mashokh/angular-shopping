import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {
  products: Product[] = [];
  currentCategoryId: number = 0;
  constructor(private productService: ProductService, private route: ActivatedRoute) { }
  searchMode: boolean = false;
  thePageNumber: number = 1;
  thePageSize: number = 10;
  theTotalElements: number = 0;

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSearch();
    } else {
      this.handleListProducts();
    }
  }

  handleSearch() {
    const theKeyWord: string = this.route.snapshot.paramMap.get('keyword')!;

    this.productService.getSearchProductListPaginate(this.thePageNumber - 1, this.thePageSize, theKeyWord).subscribe(
      data => {
        this.products = data._embedded.products;
        this.theTotalElements = data.page.totalElements;
      }
    )
  }

  handleListProducts() {
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    if (hasCategoryId) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    } else {
      this.currentCategoryId = 1;
    }
    this.productService.getProductListPaginate(this.thePageNumber - 1, this.thePageSize, this.currentCategoryId).subscribe(
      data => {
        this.products = data._embedded.products;
        this.theTotalElements = data.page.totalElements;
      }
    )
  }
  updatePageSize(arg0: string) {
    this.thePageSize = +arg0;
    this.thePageNumber = 1;
    this.listProducts();
  }

}
