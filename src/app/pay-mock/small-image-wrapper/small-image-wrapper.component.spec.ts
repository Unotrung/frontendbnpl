import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallImageWrapperComponent } from './small-image-wrapper.component';

describe('SmallImageWrapperComponent', () => {
  let component: SmallImageWrapperComponent;
  let fixture: ComponentFixture<SmallImageWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmallImageWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallImageWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
