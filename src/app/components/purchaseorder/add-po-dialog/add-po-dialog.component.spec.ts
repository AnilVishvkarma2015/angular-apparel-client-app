import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPoDialogComponent } from './add-po-dialog.component';

describe('AddPoDialogComponent', () => {
  let component: AddPoDialogComponent;
  let fixture: ComponentFixture<AddPoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
