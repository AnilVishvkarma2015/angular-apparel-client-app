import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStockDialogComponent } from './update-stock-dialog.component';

describe('UpdateStockDialogComponent', () => {
  let component: UpdateStockDialogComponent;
  let fixture: ComponentFixture<UpdateStockDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateStockDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateStockDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
