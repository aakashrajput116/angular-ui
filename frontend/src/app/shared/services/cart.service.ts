import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CartItem } from '../classess/cart-item';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../classess/products';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  products = JSON.parse(localStorage.getItem("cartItem")) || [];
  cartItems: BehaviorSubject<CartItem[]> = new BehaviorSubject([]);

  constructor(private _toastr: ToastrService) { }

  getTotalAmount(): Observable<number> {
    return this.cartItems.map(() => {
      return this.products.reduce((total: number, curr: CartItem) => {
        return total + (curr.product.price * curr.quantity);
      }, 0)
    });
  }

  getItems(): Observable<CartItem[]> {
    return of(this.products);
  }

  // add to cart
  addToCart(product: Product, quantity: number): CartItem | boolean {
    let item: CartItem | boolean = false;

    // If Product Exists
    let hasItem = this.products.find((items, index) => {
      if (items.product.id == product.id) {
        let qty: number = this.products[index].quantity + quantity;
        let stock = true;

        if (qty != 0 && stock) {
          this.products[index]["quantity"] = qty;
          localStorage.setItem("cartItem", JSON.stringify(this.products));
          this._toastr.success("This product added to cartItem !!");
        }
        return true;
      }
    });

    // If products does not exists (add new product here)
    if (!hasItem) {
      item = { product: product, quantity: quantity };
      this.products.push(item);
      localStorage.setItem("cartItem", JSON.stringify(this.products));
      this._toastr.success("This product added to cartItem !!");
    }

    return item;
  }


  // update Cart
  updateCartQuantity(product: Product, quantity: number): CartItem | boolean {
    return this.products.find((items, index) => {
      if (items.product.id == product.id) {
        let qty: number = this.products[index].quantity + quantity;
        let stock = this.calculateStockCounts(this.products[index], quantity);

        if (qty != 0 && stock) {
          this.products[index]["quantity"] = qty;
          localStorage.setItem("cartItem", JSON.stringify(this.products));
          this._toastr.success("This product added to cartItem !!");
        }
        return true;
      }
    });
  }

  // get stock
  calculateStockCounts(product: CartItem, quantity: number): boolean {
    let qty = product.quantity + quantity;
    let stock = product.product.stock;
    if (stock < qty) {
      this._toastr.error("You can not add more item !!");
      return false;
    }
    return true;
  }

  // remove item from cart
  removeFromCart(product: CartItem) {
    if (product === undefined) {
      return false;
    }

    let index = this.products.indexOf(product);
    this.products.splice(index, 1);
    localStorage.setItem("cartItem", JSON.stringify(this.products));
  }

  clearAllItemFromCart() {
   // this.products = [];
   this.products.splice(0,this.products.length);
    localStorage.setItem("cartItem", JSON.stringify(this.products));
  }

}
