import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePoDialogComponent } from './update-po-dialog.component';

describe('UpdatePoDialogComponent', () => {
  let component: UpdatePoDialogComponent;
  let fixture: ComponentFixture<UpdatePoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatePoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
