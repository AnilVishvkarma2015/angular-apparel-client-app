import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSupplierDialogComponent } from './update-supplier-dialog.component';

describe('UpdateSupplierDialogComponent', () => {
  let component: UpdateSupplierDialogComponent;
  let fixture: ComponentFixture<UpdateSupplierDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateSupplierDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSupplierDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
