import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { Product } from '../classess/products';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  products = JSON.parse(localStorage.getItem("wishlistItem")) || [];

  constructor(private _toastr: ToastrService) { }

  // get Products 
  getProducts(): Observable<Product[]> {
    return of(this.products);
  }

  // If item is already added in whishlist
  hasProduct(product: Product): boolean {
    let item = this.products.find(item => item.id === product.id);
    return item !== undefined;
  }

  // add to wishlist
  addToWishlist(product: Product): boolean {
    let item: boolean = false;
    if (!this.hasProduct(product)) {
      this.products.push(product);
      localStorage.setItem("wishlistItem", JSON.stringify(this.products));
      this._toastr.success("This product added to wishlist !!");
    }
    return item;
  }

  // remove item from wishlist
  removeFromWistlist(product: Product) {
    if (product === undefined) {
      return false;
    }

    let index = this.products.indexOf(product);
    this.products.splice(index,1);
    localStorage.setItem("wishlistItem", JSON.stringify(this.products));
  }
}
