import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProductDialogComponent } from './update-product-dialog.component';

describe('UpdateProductDialogComponent', () => {
  let component: UpdateProductDialogComponent;
  let fixture: ComponentFixture<UpdateProductDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateProductDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProductDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
