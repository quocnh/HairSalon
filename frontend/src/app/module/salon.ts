import Service from './service';

export default class Salon {
    _id: string;
    name: string;
    _salonOwnerId: string;
    phone: number;
    email: string;
    district: string;
    city: string;
    address: string;
    local: string;
    info: string;
    services: Service[];
    priceFrom: number;
    priceTo: number;
    rate: number;
    numRate: number;
    photo: string;
}
