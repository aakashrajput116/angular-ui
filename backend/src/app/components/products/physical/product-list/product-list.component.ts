import { Component, OnInit, OnDestroy } from '@angular/core';
import { Global } from 'src/app/shared/global';
import { DataService } from 'src/app/shared/services/data.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
  objRows = [];

  constructor(private _dataService: DataService, private _toastr: ToastrService, private navRoute: Router) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this._dataService.get(Global.BASE_API_PATH + "ProductMaster/GetAll").subscribe(res => {
      if (res.isSuccess) {
        this.objRows = res.data;
      } else {
        this._toastr.error(res.errors[0], "Product Master");
      }
    });
  }

  Edit(Id: number) {
    // this.navRoute.navigate(['/products/physical/add-product'], { queryParams: { productId: Id } });
    this.navRoute.navigateByUrl('/products/physical/add-product', { state: { productId: Id } });
  }

  Delete(Id: number) {
    let obj = { id: Id };

    this._dataService.post(Global.BASE_API_PATH + "ProductMaster/Delete/", obj).subscribe(res => {
      if (res.isSuccess) {
        this.getData();
        this._toastr.success("Data Deleted successfully !!", "Product Master");
      } else {
        this._toastr.info(res.errors[0], "Product Master");
      }
    });
  }

  ngOnDestroy() {
    this.objRows = null;
  }
}