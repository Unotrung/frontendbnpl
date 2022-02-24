import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerInformationRegisterComponent } from './customer-information-register.component';

describe('CustomerInformationRegisterComponent', () => {
  let component: CustomerInformationRegisterComponent;
  let fixture: ComponentFixture<CustomerInformationRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerInformationRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerInformationRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
