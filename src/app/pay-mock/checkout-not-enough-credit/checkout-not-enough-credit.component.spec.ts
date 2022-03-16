import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutNotEnoughCreditComponent } from './checkout-not-enough-credit.component';

describe('CheckoutNotEnoughCreditComponent', () => {
  let component: CheckoutNotEnoughCreditComponent;
  let fixture: ComponentFixture<CheckoutNotEnoughCreditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutNotEnoughCreditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutNotEnoughCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
