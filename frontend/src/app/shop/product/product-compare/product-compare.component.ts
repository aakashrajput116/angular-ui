import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/classess/products';
import { ProductsService } from 'src/app/shared/services/products.service';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-product-compare',
  templateUrl: './product-compare.component.html',
  styles: [
  ]
})
export class ProductCompareComponent implements OnInit {
  products: Product[] = [];

  constructor(public productsService: ProductsService, private cartService: CartService) {

  }

  ngOnInit(): void {
    this.productsService.getCompareProducts().subscribe(res => this.products = res);
  }

  addToCart(product: Product, quantity: number = 1) {
    this.cartService.addToCart(product, quantity);
  }

  removeItem(product: Product) {
    this.productsService.removeFromCompare(product);
  }

}
