import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CartItem } from 'src/app/shared/classess/cart-item';
import { ProductsService } from 'src/app/shared/services/products.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

  @Input() shoppingCartItems: CartItem[] = [];

  constructor(private translate: TranslateService, public productsService: ProductsService, private cartService: CartService) { }

  ngOnInit(): void {
  }

  changeLanguage(lang: any) {
    this.translate.use(lang);
  }

  getTotal(): Observable<number> {
    return this.cartService.getTotalAmount();
  }

  removeItem(item: CartItem) {
    this.cartService.removeFromCart(item);
  }

}
