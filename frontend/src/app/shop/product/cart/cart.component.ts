import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/shared/classess/cart-item';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductsService } from 'src/app/shared/services/products.service';
import { Product } from 'src/app/shared/classess/products';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  shoppingCartItems: CartItem[] = [];

  constructor(private _cartService: CartService, public productsService: ProductsService) { }

  ngOnInit(): void {
    this._cartService.getItems().subscribe(res => this.shoppingCartItems = res);
  }

  Increase(product: Product, quantity: number = 1) {
    this._cartService.updateCartQuantity(product, quantity);
  }

  Decrease(product: Product, quantity: number = -1) {
    this._cartService.updateCartQuantity(product, quantity);
  }

  removeItem(item: CartItem) {
    this._cartService.removeFromCart(item);
  }

  getTotal():Observable<number>{
    return this._cartService.getTotalAmount();
  }
}
