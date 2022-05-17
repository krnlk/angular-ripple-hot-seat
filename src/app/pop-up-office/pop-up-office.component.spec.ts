"use strict";
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpOfficeComponent } from './pop-up-office.component';

describe('PopUpOfficeComponent', () => {
  let component: PopUpOfficeComponent;
  let fixture: ComponentFixture<PopUpOfficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpOfficeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
