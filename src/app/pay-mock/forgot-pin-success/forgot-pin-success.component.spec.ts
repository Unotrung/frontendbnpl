import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPinSuccessComponent } from './forgot-pin-success.component';

describe('ForgotPinSuccessComponent', () => {
  let component: ForgotPinSuccessComponent;
  let fixture: ComponentFixture<ForgotPinSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotPinSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPinSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
