import { Component, OnInit } from '@angular/core';
import { LandingFixService } from '../../services/landing-fix.service';
import * as $ from 'jquery';
import { CartItem } from '../../classess/cart-item';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header-one',
  templateUrl: './header-one.component.html',
  styleUrls: ['./header-one.component.scss']
})
export class HeaderOneComponent implements OnInit {
  shoppingCartItems: CartItem[] = [];

  constructor(private fix: LandingFixService, private cartService: CartService) {
    this.cartService.getItems().subscribe(res => {
      this.shoppingCartItems = res;
    });
  }

  ngOnInit(): void {
    $.getScript('assets/js/menu.js');
  }

  openNav() {
    this.fix.addNavFix();
  }

  closeNav() {
    this.fix.removeNavFix();
  }
}
