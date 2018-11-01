import { SaleItems } from './saleitems.model';

export class Sale {
    id: string;
    billNumber: Number;
    billDate: Date;
    customerPhone: string;
    grandTotal: Number;
    discount: Number;
    netAmount: Number;
    quantitySold: Number;
    saleItems: SaleItems[];
}