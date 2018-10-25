import { PoItems } from './poitems.model';

export class PurchaseOrder {
    id: string;
    orderNumber: string;
    orderStatus: string;
    supplierName: string;
    quantityOrdered: Number;
    deliveryDate: Date;
    billingAmount: Number;
    poItems: PoItems[];
}
