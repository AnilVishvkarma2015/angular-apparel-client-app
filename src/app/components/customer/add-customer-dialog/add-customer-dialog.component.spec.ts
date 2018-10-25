import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCustomerDialogComponent } from './add-customer-dialog.component';

describe('AddCustomerDialogComponent', () => {
  let component: AddCustomerDialogComponent;
  let fixture: ComponentFixture<AddCustomerDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCustomerDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCustomerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
