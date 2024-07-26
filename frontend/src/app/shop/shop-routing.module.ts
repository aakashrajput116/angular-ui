import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './product/cart/cart.component';
import { WishlistComponent } from './product/wishlist/wishlist.component';
import { ProductCompareComponent } from './product/product-compare/product-compare.component';
import { ProductLeftSidebarComponent } from './product/product-details/product-left-sidebar/product-left-sidebar.component';
import { CheckoutComponent } from './product/checkout/checkout.component';
import { CollectionLeftSidebarComponent } from './product/collection/collection-left-sidebar/collection-left-sidebar.component';
import { SuccessComponent } from './product/success/success.component';


const routes: Routes = [
  { path: 'shop', component: HomeComponent },
  { path: 'cart', component: CartComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'compare', component: ProductCompareComponent },
  { path: 'left-sidebar/product/:id', component: ProductLeftSidebarComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'checkout/success', component: SuccessComponent },
  { path: 'left-sidebar/collection/:category', component: CollectionLeftSidebarComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
