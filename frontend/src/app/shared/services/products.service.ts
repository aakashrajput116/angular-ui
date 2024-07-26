import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { Product } from '../classess/products';
import { Global } from './global';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  currency: string = 'INR';
  products = JSON.parse(localStorage.getItem("compareItem")) || [];

  constructor(private _dataService: DataService, private _toastr: ToastrService) { }

  private allproducts(): Observable<Product[]> {
    let data = this._dataService.get(Global.BASE_API_PATH + "ProductMaster/GetProductList");
    return data;
  }

  // get Product
  getProducts() {
    return this.allproducts();
  }

  // get product by id
  getProduct(id: number): Observable<Product> {
    return this.allproducts().map(items => items.find(item => item.id === id));
  }

  // get product by category
  getProductByCategory(category: string): Observable<Product[]> {
    return this.allproducts().map(items =>
      items.filter((item: Product) => {
        if (category == 'all') {
          return true;
        } else {
          return item.category === category;
        }
      })
    );
  }

  //get Compare products 
  getCompareProducts(): Observable<Product[]> {
    return of(this.products);
  }

  // If item is already added in compare
  hasProduct(product: Product): boolean {
    let item = this.products.find(item => item.id === product.id);
    return item !== undefined;
  }

  // add to compare
  addToCompare(product: Product): boolean {
    let item: boolean = false;

    if (!this.hasProduct(product)) {
      if (this.products.length < 4) {
        this.products.push(product);
        localStorage.setItem("compareItem", JSON.stringify(this.products));
      } else {
        this._toastr.warning("Maximum 4 products are in compare !!");
      }
    }
    return item;
  }

  // remove item from compare
  removeFromCompare(product: Product) {
    if (product === undefined) {
      return false;
    }

    let index = this.products.indexOf(product);
    this.products.splice(index, 1);
    localStorage.setItem("compareItem", JSON.stringify(this.products));
  }

}
