import { Component, OnInit } from '@angular/core';
import { Global } from 'src/app/shared/global';
import { DataService } from 'src/app/shared/services/data.service';
import { ToastrService } from 'ngx-toastr';
import * as chartData from '../../shared/data/chart';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  isShowSalesDataPaymentTypeWise: boolean = false;
  CashOnDeliveryReport = [];

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

  salesChartData = [];
  salesChartLabels: any;
  salesChartOptions: any;
  salesChartColors: any;
  salesChartLegend: any;
  salesChartType: any;
  chart: any;
  columnChart: any;
  lineChart: any;

  // // For Chart Satrt

  // //lineChart
  // salesChartData = [
  //   { data: [10, 50, 0, 80, 10, 70] },
  //   { data: [20, 40, 15, 70, 30, 27] },
  //   { data: [5, 30, 20, 40, 50, 20] }
  // ];
  // salesChartLabels = ["1 min.", "10 min.", "20 min.", "30 min.", "40 min.", "50 min."];
  // salesChartOptions = chartData.salesChartOptions;
  // salesChartColors = chartData.salesChartColors;
  // salesChartLegend = chartData.salesChartLegend;
  // salesChartType = chartData.salesChartType;

  // //user Growth
  // chart = {
  //   type: 'Line',
  //   data: {
  //     labels: [],
  //     series: [
  //       [3, 4, 3, 5, 4, 3, 5]
  //     ]
  //   },
  //   options: {
  //     showScale: false,
  //     fullWidth: !0,
  //     showArea: !0,
  //     label: false,
  //     width: '600',
  //     height: '358',
  //     low: 0,
  //     offset: 0,
  //     axisX: {
  //       showLabel: false,
  //       showGrid: false
  //     },
  //     axisY: {
  //       showLabel: false,
  //       showGrid: false,
  //       low: 0,
  //       offset: -10,
  //     },
  //   }
  // };

  // columnChart = {
  //   chartType: 'ColumnChart',
  //   dataTable: [
  //     ["Year", "Sales", "Expenses"],
  //     ["100", 2.5, 3.8],
  //     ["200", 3, 1.8],
  //     ["300", 3, 4.3],
  //     ["400", 0.9, 2.3],
  //     ["500", 1.3, 3.6],
  //     ["600", 1.8, 2.8],
  //     ["700", 3.8, 2.8],
  //     ["800", 1.5, 2.8]
  //   ],
  //   options: {
  //     legend: { position: 'none' },
  //     bars: "vertical",
  //     vAxis: {
  //       format: "decimal"
  //     },
  //     height: 340,
  //     width: '100%',
  //     colors: ["#ff7f83", "#a5a5a5"],
  //     backgroundColor: 'transparent'
  //   },
  // };
  // //LineChart
  // lineChart: any = {
  //   chartType: 'LineChart',
  //   dataTable: [
  //     ['Month', 'Guardians of the Galaxy', 'The Avengers'],
  //     [10, 20, 60],
  //     [20, 40, 10],
  //     [30, 20, 40],
  //     [40, 50, 30],
  //     [50, 20, 80],
  //     [60, 60, 30],
  //     [70, 10, 20],
  //     [80, 40, 90],
  //     [90, 20, 0]
  //   ],
  //   options: {
  //     colors: ["#ff8084", "#a5a5a5"],
  //     legend: { position: 'none' },
  //     height: 500,
  //     width: '100%',
  //     backgroundColor: 'transparent'
  //   },
  // };

  // // For Chart end

  constructor(private _dataService: DataService, private _toastr: ToastrService) { }

  ngOnInit(): void {
    this.getData();
    this.ChartSalesDataPaymentTypeWise();
    this.ChartCustomerGrowth();
    this.ChartOrderstatusdata_columnChart();
    this.ChartOrderstatusdata_lineChart();
  }

  getData() {
    this._dataService.get(Global.BASE_API_PATH + "PaymentMaster/GetReportInvoiceList").subscribe(res => {
      if (res.isSuccess) {
        this.CashOnDeliveryReport = res.data;
      } else {
        this._toastr.error(res.errors[0], "Report");
      }
    });
  }

  ChartSalesDataPaymentTypeWise() {
    // Sales Data Payment Type Wise (ng2-charts)
    this.isShowSalesDataPaymentTypeWise = false;

    let objSaleChartData = {};
    let arr = [];

    this._dataService.get(Global.BASE_API_PATH + "PaymentMaster/GetChartSalesDataPaymentTypeWise").subscribe(res => {
      if (res.isSuccess) {
        // counts: 1 date: "01-08-2020" paymentType: "Cash On Delivery"
        let allData = res.data;
        this.salesChartLabels = allData.map(item => item.date).filter((value, index, self) => self.indexOf(value) === index);
        let allPaymentType = allData.map(item => item.paymentType).filter((value, index, self) => self.indexOf(value) === index);
        let varStr = "";

        for (let status of allPaymentType) {
          varStr = varStr + " / " + status;
          arr = [];
          for (let date of this.salesChartLabels) {
            for (let data in allData) {
              if (status == allData[data].paymentType && date == allData[data].date) {
                arr[arr.length] = allData[data].counts;
              }
            }
          }

          objSaleChartData = { data: arr }
          this.salesChartData[this.salesChartData.length] = objSaleChartData;
          this.isShowSalesDataPaymentTypeWise = true;
        }

        this.salesChartOptions = chartData.salesChartOptions;
        this.salesChartColors = chartData.salesChartColors;
        this.salesChartLegend = chartData.salesChartLegend;
        this.salesChartType = chartData.salesChartType;
      }
    });

  }

  ChartCustomerGrowth() {
    let objGrowthData = [];
    let dates = [];
    this._dataService.get(Global.BASE_API_PATH + "PaymentMaster/GetChartUserGrowth").subscribe(res => {
      if (res.isSuccess) {
        let allData = res.data;
        objGrowthData = allData.map(item => item.counts);
        dates = allData.map(item => item.date);
        this.chart = {
          type: 'Line',
          data: {
            labels: dates,
            series: [
              objGrowthData
            ]
          },
          options: {
            axisX: {
              showGrid: false
            },
            height: 300
          }
        };
      }
    });
  }

  //["Year", "Sales", "Expenses"],
  //     ["100", 2.5, 3.8],
  //     ["200", 3, 1.8],
  //     ["300", 3, 4.3],
  //     ["400", 0.9, 2.3],
  //     ["500", 1.3, 3.6],
  //     ["600", 1.8, 2.8],
  //     ["700", 3.8, 2.8],
  //     ["800", 1.5, 2.8]
  ChartOrderstatusdata_columnChart() {
    let objOrderStatusChartData = [];
    let arr = ["Date"];

    this._dataService.get(Global.BASE_API_PATH + "PaymentMaster/GetChartOrderStatus").subscribe(res => {
      if (res.isSuccess) {
        debugger;
        let allData = res.data;
        let alldates = allData.map(item => item.date).filter((value, index, self) => self.indexOf(value) === index);
        let allOrderStatus = allData.map(item => item.orderStatus).filter((value, index, self) => self.indexOf(value) === index);

        for (let status of allOrderStatus) {
          arr.push(status);
        }
        objOrderStatusChartData[objOrderStatusChartData.length] = arr;
        let varzero: any = 0;
        for (let date of alldates) {
          arr = ["", varzero, varzero, varzero, varzero];
          arr[0] = date;

          for (let status in allOrderStatus) {
            for (let data in allData) {
              if (allOrderStatus[status] == allData[data].orderStatus && date == allData[data].date) {
                arr[parseInt(status) + 1] = allData[data].counts;
              }
            }
          }
          objOrderStatusChartData[objOrderStatusChartData.length] = arr;
        }

        this.columnChart = {
          chartType: 'ColumnChart',
          dataTable: objOrderStatusChartData,
          options: {
            legend: { position: 'none' },
            bars: "vertical",
            vAxis: {
              format: "decimal"
            },
            height: 340,
            width: '100%',
            colors: ["#ff7f83", "#a5a5a5"],
            backgroundColor: 'transparent'
          },
        };

      }
    });

  }


  ChartOrderstatusdata_lineChart() {
    let objOrderStatusChartData = [];
    let arr = ["Date"];

    this._dataService.get(Global.BASE_API_PATH + "PaymentMaster/GetChartOrderStatus").subscribe(res => {
      if (res.isSuccess) {
        debugger;
        let allData = res.data;
        let alldates = allData.map(item => item.date).filter((value, index, self) => self.indexOf(value) === index);
        let allOrderStatus = allData.map(item => item.orderStatus).filter((value, index, self) => self.indexOf(value) === index);

        for (let status of allOrderStatus) {
          arr.push(status);
        }
        objOrderStatusChartData[objOrderStatusChartData.length] = arr;
        let varzero: any = 0;
        for (let date of alldates) {
          arr = ["", varzero, varzero, varzero, varzero];
          arr[0] = date;

          for (let status in allOrderStatus) {
            for (let data in allData) {
              if (allOrderStatus[status] == allData[data].orderStatus && date == allData[data].date) {
                arr[parseInt(status) + 1] = allData[data].counts;
              }
            }
          }
          objOrderStatusChartData[objOrderStatusChartData.length] = arr;
        }

        debugger;
        this.lineChart = {
          chartType: 'LineChart',
          dataTable: objOrderStatusChartData,
          options: {
            colors: ["#ff8084", "#a5a5a5"],
            legend: { position: 'none' },
            height: 500,
            width: '100%',
            backgroundColor: 'transparent'
          },
        };
      }
    });

  }


}
