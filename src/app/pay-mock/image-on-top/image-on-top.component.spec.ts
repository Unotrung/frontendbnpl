import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageOnTopComponent } from './image-on-top.component';

describe('ImageOnTopComponent', () => {
  let component: ImageOnTopComponent;
  let fixture: ComponentFixture<ImageOnTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageOnTopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageOnTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
