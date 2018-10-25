import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSaleDialogComponent } from './add-sale-dialog.component';

describe('AddSaleDialogComponent', () => {
  let component: AddSaleDialogComponent;
  let fixture: ComponentFixture<AddSaleDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSaleDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSaleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
