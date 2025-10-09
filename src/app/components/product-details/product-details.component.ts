import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product!: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.getProductDetails();
  }

  getProductDetails(): void {
    const productId: number = +this.route.snapshot.paramMap.get('id')!;
    this.productService.searchProductDetails(productId).subscribe(
      data => {
        console.log(data)
        this.product = data; 
      }
    );
  }
}
