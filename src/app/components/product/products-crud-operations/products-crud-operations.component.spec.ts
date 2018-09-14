import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsCrudOperations } from './products-crud-operations.component';

describe('AddUpdateProductComponent', () => {
  let component: ProductsCrudOperations;
  let fixture: ComponentFixture<ProductsCrudOperations>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsCrudOperations ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsCrudOperations);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
