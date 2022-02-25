import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupPinComponent } from './setup-pin.component';

describe('SetupPinComponent', () => {
  let component: SetupPinComponent;
  let fixture: ComponentFixture<SetupPinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupPinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
