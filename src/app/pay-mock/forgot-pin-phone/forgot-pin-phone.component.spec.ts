import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPinPhoneComponent } from './forgot-pin-phone.component';

describe('ForgotPinPhoneComponent', () => {
  let component: ForgotPinPhoneComponent;
  let fixture: ComponentFixture<ForgotPinPhoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotPinPhoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPinPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
