import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerEsignConfirmComponent } from './customer-esign-confirm.component';

describe('CustomerEsignConfirmComponent', () => {
  let component: CustomerEsignConfirmComponent;
  let fixture: ComponentFixture<CustomerEsignConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerEsignConfirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerEsignConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
