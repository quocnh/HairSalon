
export default class productOrder {
    _id: string;
    _salonOwnerId: string;
    _distributorId: string;
    _productId: string;
    createdDate: Date;
    quantity: number;
    info: string;
    totalPrice: number;
    paidAmount: number;
    event: string;    
    discount: number;
    status: string; //'status of order (completed/delivery/waiting for payment)'
}