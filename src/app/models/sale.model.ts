import { SaleItems } from './saleitems.model';

export class Sale {
    id: string;
    billNumber: Number;
    billDate: string;
    customerPhone: string;
    grandTotal: Number;
    discount: Number;
    netAmount: Number;
    quantitySold: Number;
    billingItems: SaleItems[];
}