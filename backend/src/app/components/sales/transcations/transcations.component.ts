import { Component, OnInit } from '@angular/core';
import { Global } from 'src/app/shared/global';
import { DataService } from 'src/app/shared/services/data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-transcations',
  templateUrl: './transcations.component.html',
  styleUrls: ['./transcations.component.scss']
})
export class TranscationsComponent implements OnInit {

  transactions: [];

  constructor(private _dataService: DataService, private _toastr: ToastrService) { }
  
  settings = {
    actions: true,
    hideSubHeader: false,
    columns: {
      transactionId: {
        title: "Transaction Id", filter: true
      },
      paymentStatus: {
        title: "Payment Status", filter: true, type: 'html'
      },
      paymentMethod: {
        title: 'Payment Method', filter: true
      },
      paymentDate: {
        title: "Payment Date", filter: true
      },
      orderStatus: {
        title: "Order Status", filter: true, type: 'html'
      },
      subTotalAmount: {
        title: 'SubTotal Amount', filter: true
      },
      shippingAmount: {
        title: 'Shipping Amount', filter: true
      },
      totalAmount: {
        title: 'Total Amount', filter: true
      }
    }
  };


  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this._dataService.get(Global.BASE_API_PATH + "PaymentMaster/GetReportTransactionDetails").subscribe(res => {
      if (res.isSuccess) {
        this.transactions = res.data;
      } else {
        this._toastr.error(res.errors[0], "Transaction Details");
      }
    });
  }

}
