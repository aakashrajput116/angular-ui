import { Injectable } from '@angular/core';
import { Order } from '../classess/order';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private OrderDetails: Order;

  constructor(private router: Router) { }

  // Create Order
  createOrder(product: any, details: any, orderId: any, paymentDate: any, expectedDate: any, amount: any) {
    let item: Order = {
      product: product,
      shippingDetails: details,
      orderId: orderId,
      paymentDate: paymentDate,
      expectedDate: expectedDate,
      totalAmount: amount
    };

    this.OrderDetails = item;
    this.router.navigate(['/home/checkout/success']);
  }

  getOrderItems(): Order {
    return this.OrderDetails;
  }

}
