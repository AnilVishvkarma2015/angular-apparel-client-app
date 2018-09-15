import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliersCrudOperationsComponent } from './suppliers-crud-operations.component';

describe('SuppliersCrudOperationsComponent', () => {
  let component: SuppliersCrudOperationsComponent;
  let fixture: ComponentFixture<SuppliersCrudOperationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuppliersCrudOperationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuppliersCrudOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
