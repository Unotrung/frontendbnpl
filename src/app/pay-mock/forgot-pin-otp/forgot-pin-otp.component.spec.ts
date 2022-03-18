import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPinOtpComponent } from './forgot-pin-otp.component';

describe('ForgotPinOtpComponent', () => {
  let component: ForgotPinOtpComponent;
  let fixture: ComponentFixture<ForgotPinOtpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotPinOtpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPinOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
