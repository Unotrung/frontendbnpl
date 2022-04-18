import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VooloRegisterHeaderComponent } from './voolo-register-header.component';

describe('VooloRegisterHeaderComponent', () => {
  let component: VooloRegisterHeaderComponent;
  let fixture: ComponentFixture<VooloRegisterHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VooloRegisterHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VooloRegisterHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
