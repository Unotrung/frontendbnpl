import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPinFailComponent } from './forgot-pin-fail.component';

describe('ForgotPinFailComponent', () => {
  let component: ForgotPinFailComponent;
  let fixture: ComponentFixture<ForgotPinFailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotPinFailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPinFailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
