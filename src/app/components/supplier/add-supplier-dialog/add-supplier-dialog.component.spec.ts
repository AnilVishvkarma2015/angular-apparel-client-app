import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSupplierDialogComponent } from './add-supplier-dialog.component';

describe('AddSupplierDialogComponent', () => {
  let component: AddSupplierDialogComponent;
  let fixture: ComponentFixture<AddSupplierDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSupplierDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSupplierDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
