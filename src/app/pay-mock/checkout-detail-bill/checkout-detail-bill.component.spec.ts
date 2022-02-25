import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutDetailBillComponent } from './checkout-detail-bill.component';

describe('CheckoutDetailBillComponent', () => {
  let component: CheckoutDetailBillComponent;
  let fixture: ComponentFixture<CheckoutDetailBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutDetailBillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutDetailBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
