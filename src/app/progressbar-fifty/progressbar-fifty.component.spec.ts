import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressbarFiftyComponent } from './progressbar-fifty.component';

describe('ProgressbarFiftyComponent', () => {
  let component: ProgressbarFiftyComponent;
  let fixture: ComponentFixture<ProgressbarFiftyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgressbarFiftyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressbarFiftyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
