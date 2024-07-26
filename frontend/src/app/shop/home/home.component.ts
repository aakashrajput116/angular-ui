import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/classess/products';
import { ProductsService } from 'src/app/shared/services/products.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: Product[] = [];
  constructor(private _productsService: ProductsService, private _toastr: ToastrService) { }

  ngOnInit(): void {
    this._productsService.getProducts().subscribe(res => {
        this.products = res;
    });
  }

}
