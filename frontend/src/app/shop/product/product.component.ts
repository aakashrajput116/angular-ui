import { Component, OnInit, Input } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';
import { ProductsService } from 'src/app/shared/services/products.service';
import { Product } from 'src/app/shared/classess/products';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input('productItem') product: any;

  varientImage: any = "";
  selectedImage: any = "";

  constructor(private _cartService: CartService, private _wishlistService: WishlistService,
    private _productService: ProductsService) { }

  ngOnInit(): void {

  }

  changeVarientImage(image: any) {
    this.varientImage = image;
    this.selectedImage = image;
  }

  addToCart(product: Product, quantity: number = 1) {
    this._cartService.addToCart(product, quantity);
  }

  addToWishlist(product: Product) {
    this._wishlistService.addToWishlist(product);
  }

  addToCompare(product: Product) {
    this._productService.addToCompare(product);
  }
}
