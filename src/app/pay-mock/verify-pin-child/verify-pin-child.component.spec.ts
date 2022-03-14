import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyPinChildComponent } from './verify-pin-child.component';

describe('VerifyPinChildComponent', () => {
  let component: VerifyPinChildComponent;
  let fixture: ComponentFixture<VerifyPinChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyPinChildComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyPinChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
