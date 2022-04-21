import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseBpnlComponent } from './choose-bpnl.component';

describe('ChooseBpnlComponent', () => {
  let component: ChooseBpnlComponent;
  let fixture: ComponentFixture<ChooseBpnlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseBpnlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseBpnlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
