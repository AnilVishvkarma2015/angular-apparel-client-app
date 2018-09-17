import { TestBed, inject } from '@angular/core/testing';

import { PurchaseorderService } from './purchaseorder.service';

describe('PurchaseorderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PurchaseorderService]
    });
  });

  it('should be created', inject([PurchaseorderService], (service: PurchaseorderService) => {
    expect(service).toBeTruthy();
  }));
});
