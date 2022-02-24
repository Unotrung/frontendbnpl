import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerInformationProcessComponent } from './customer-information-process.component';

describe('CustomerInformationProcessComponent', () => {
  let component: CustomerInformationProcessComponent;
  let fixture: ComponentFixture<CustomerInformationProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerInformationProcessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerInformationProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
