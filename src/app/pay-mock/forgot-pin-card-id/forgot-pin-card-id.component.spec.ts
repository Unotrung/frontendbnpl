import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPinCardIdComponent } from './forgot-pin-card-id.component';

describe('ForgotPinCardIdComponent', () => {
  let component: ForgotPinCardIdComponent;
  let fixture: ComponentFixture<ForgotPinCardIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotPinCardIdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPinCardIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
