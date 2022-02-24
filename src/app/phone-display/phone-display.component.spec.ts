import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneDisplayComponent } from './phone-display.component';

describe('PhoneDisplayComponent', () => {
  let component: PhoneDisplayComponent;
  let fixture: ComponentFixture<PhoneDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhoneDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
