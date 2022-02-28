import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureSelfieComponent } from './picture-selfie.component';

describe('PictureSelfieComponent', () => {
  let component: PictureSelfieComponent;
  let fixture: ComponentFixture<PictureSelfieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PictureSelfieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PictureSelfieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
