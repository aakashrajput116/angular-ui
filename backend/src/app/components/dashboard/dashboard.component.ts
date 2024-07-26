import { Component, OnInit } from '@angular/core';
import { Global } from 'src/app/shared/global';
import { DataService } from 'src/app/shared/services/data.service';
import { ToastrService } from 'ngx-toastr';
import * as chartData from '../../shared/data/chart';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isShowOrderStatus: boolean = false;
  orders: [];
  varorders: number;
  varshipAmt: number;
  varcashOnDelivery: number;
  varcancelled: number;

  statusText = "";
  lineChartData = [];
  lineChartLabels: any;
  lineChartOptions: any;
  lineChartColors: any;
  lineChartLegend: any;
  lineChartType: any;


  constructor(private _dataService: DataService, private _toastr: ToastrService) { }

  settings = {
    actions: true,
    hideSubHeader: false,
    columns: {
      orderId: {
        title: "Order Id", filter: true
      },
      invoiceNo: {
        title: "Invoice No", filter: true
      },
      paymentStatus: {
        title: "Payment Status", filter: true, type: 'html'
      },
      paymentMethod: {
        title: "Payment Method", filter: true
      },
      orderStatus: {
        title: "Order Status", filter: true, type: 'html'
      },
      paymentDate: {
        title: "Payment Date", filter: true
      },
      subTotalAmount: {
        title: "Sub Total Amount", filter: true
      },
      shippingAmount: {
        title: "Shipping Amount", filter: true
      },
      totalAmount: {
        title: "Total Amount", filter: true
      }
    }
  };

  ngOnInit(): void {
    this.getData();
    this.getNetFigure();
    this.OrderStatus();
  }

  getData() {
    this._dataService.get(Global.BASE_API_PATH + "PaymentMaster/GetReportManageOrder").subscribe(res => {
      if (res.isSuccess) {
        this.orders = res.data;
      } else {
        this._toastr.error(res.errors[0], "Orders");
      }
    });
  }
  getNetFigure() {
    this._dataService.get(Global.BASE_API_PATH + "PaymentMaster/GetReportNetFigure").subscribe(res => {
      if (res.isSuccess) {
        this.varcancelled = res.data[0].cancelled;
        this.varorders = res.data[0].orders;
        this.varshipAmt = res.data[0].shippingAmount;
        this.varcashOnDelivery = res.data[0].cashOnDelivery;
      } else {
        this._toastr.error(res.errors[0], "Dashboard");
      }
    });
  }

  OrderStatus() {
    // this.lineChartLegend = chartData.lineChartLegend;
    // this.lineChartOptions = chartData.lineChartOptions;
    // this.lineChartType= chartData.lineChartType;
    // this.lineChartLegend = chartData.lineChartLegend;

    // this.lineChartData = [
    //   { data: [1, 1, 2, 1, 2, 2] },
    //   { data: [0, 1, 1, 2, 1, 1] },
    //   { data: [0, 1, 0, 1, 2, 1] },
    //   { data: [1, 2, 3, 2, 1, 3] }
    // ];

    // this.lineChartLabels =  ["1 min.", "10 min.", "20 min", "30 min.", "40 min.", "50 min."];

    let objLineChartData = {};
    let arr = [];

    this._dataService.get(Global.BASE_API_PATH + "PaymentMaster/GetChartOrderStatus").subscribe(res => {
      if (res.isSuccess) {
        // "orderStatus": "Delivered", "date": "01-08-2020", "counts": 1
        let allData = res.data;
        this.lineChartLabels = allData.map(item => item.date).filter((value, index, self) => self.indexOf(value) === index);
        let allOrderStatus = allData.map(item => item.orderStatus).filter((value, index, self) => self.indexOf(value) === index);
        let varStr = "";

        for (let status of allOrderStatus) {
          varStr = varStr + " / " + status;
          arr = [];
          for (let date of this.lineChartLabels) {
            for (let data in allData) {
              if (status == allData[data].orderStatus && date == allData[data].date) {
                arr[arr.length] = allData[data].counts;
              }
            }
          }

          objLineChartData = { data: arr }
          this.lineChartData[this.lineChartData.length] = objLineChartData;
          this.isShowOrderStatus = true;
        }

        this.statusText = varStr.replace('/', "");
        this.lineChartLegend = chartData.lineChartLegend;
        this.lineChartOptions = chartData.lineChartOptions;
        this.lineChartType = chartData.lineChartType;
        this.lineChartLegend = chartData.lineChartLegend;
      }
    });


  }

}
