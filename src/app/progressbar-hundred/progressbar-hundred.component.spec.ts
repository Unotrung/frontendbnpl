import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressbarHundredComponent } from './progressbar-hundred.component';

describe('ProgressbarHundredComponent', () => {
  let component: ProgressbarHundredComponent;
  let fixture: ComponentFixture<ProgressbarHundredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgressbarHundredComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressbarHundredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
