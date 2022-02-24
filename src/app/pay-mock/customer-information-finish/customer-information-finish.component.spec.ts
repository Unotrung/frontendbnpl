import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerInformationFinishComponent } from './customer-information-finish.component';

describe('CustomerInformationFinishComponent', () => {
  let component: CustomerInformationFinishComponent;
  let fixture: ComponentFixture<CustomerInformationFinishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerInformationFinishComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerInformationFinishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
