import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayPoItemsComponent } from './display-po-items.component';

describe('DisplayPoItemsComponent', () => {
  let component: DisplayPoItemsComponent;
  let fixture: ComponentFixture<DisplayPoItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayPoItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayPoItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
