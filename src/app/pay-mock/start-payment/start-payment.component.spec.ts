import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartPaymentComponent } from './start-payment.component';

describe('StartPaymentComponent', () => {
  let component: StartPaymentComponent;
  let fixture: ComponentFixture<StartPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
