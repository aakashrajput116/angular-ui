import { CartItem } from './cart-item';

export interface Order {
    product: CartItem;
    shippingDetails?: any;
    orderId?: any;
    totalAmount?: number;
    expectedDate?: any;
    paymentDate?: any;
}