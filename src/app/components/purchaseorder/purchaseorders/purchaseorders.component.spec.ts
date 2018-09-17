import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseordersComponent } from './purchaseorders.component';

describe('PurchaseordersComponent', () => {
  let component: PurchaseordersComponent;
  let fixture: ComponentFixture<PurchaseordersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseordersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
