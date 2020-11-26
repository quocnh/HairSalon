
export default class Order {
    _id: string;
    _salonId: string;
    _salonOwnerId: string;
    _distributorId: string;
    _productId: string;
    createdDate: Date;
    quantity: number;
    info: string;
    totalPrice: number;
    paidAmount: number;
    status: string; //'status of order (completed/delivery/waiting for payment)'
}