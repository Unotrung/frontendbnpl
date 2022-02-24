import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPinInstallComponent } from './customer-pin-install.component';

describe('CustomerPinInstallComponent', () => {
  let component: CustomerPinInstallComponent;
  let fixture: ComponentFixture<CustomerPinInstallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerPinInstallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerPinInstallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
