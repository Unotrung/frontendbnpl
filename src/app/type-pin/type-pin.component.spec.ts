import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypePinComponent } from './type-pin.component';

describe('TypePinComponent', () => {
  let component: TypePinComponent;
  let fixture: ComponentFixture<TypePinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypePinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypePinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
