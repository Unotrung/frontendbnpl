import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutTenorComponent } from './checkout-tenor.component';

describe('CheckoutTenorComponent', () => {
  let component: CheckoutTenorComponent;
  let fixture: ComponentFixture<CheckoutTenorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutTenorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutTenorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
