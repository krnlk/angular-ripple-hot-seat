import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewComponentComponent } from './office.component';

describe('NewComponentComponent', () => {
  let component: NewComponentComponent;
  let fixture: ComponentFixture<NewComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfficeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
