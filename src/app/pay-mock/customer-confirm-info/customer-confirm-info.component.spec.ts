import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerConfirmInfoComponent } from './customer-confirm-info.component';

describe('CustomerConfirmInfoComponent', () => {
  let component: CustomerConfirmInfoComponent;
  let fixture: ComponentFixture<CustomerConfirmInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerConfirmInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerConfirmInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
