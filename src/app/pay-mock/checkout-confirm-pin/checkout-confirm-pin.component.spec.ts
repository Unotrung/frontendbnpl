import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutConfirmPinComponent } from './checkout-confirm-pin.component';

describe('CheckoutConfirmPinComponent', () => {
  let component: CheckoutConfirmPinComponent;
  let fixture: ComponentFixture<CheckoutConfirmPinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutConfirmPinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutConfirmPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
