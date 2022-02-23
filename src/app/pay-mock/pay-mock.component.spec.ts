import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayMockComponent } from './pay-mock.component';

describe('PayMockComponent', () => {
  let component: PayMockComponent;
  let fixture: ComponentFixture<PayMockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayMockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayMockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
