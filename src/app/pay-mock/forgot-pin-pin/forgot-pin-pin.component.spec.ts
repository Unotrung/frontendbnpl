import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPinPinComponent } from './forgot-pin-pin.component';

describe('ForgotPinPinComponent', () => {
  let component: ForgotPinPinComponent;
  let fixture: ComponentFixture<ForgotPinPinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotPinPinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPinPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
