import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSaleComponent } from './create-sale.component';

describe('CreateSaleComponent', () => {
  let component: CreateSaleComponent;
  let fixture: ComponentFixture<CreateSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
