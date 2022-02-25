import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectronicContractComponent } from './electronic-contract.component';

describe('ElectronicContractComponent', () => {
  let component: ElectronicContractComponent;
  let fixture: ComponentFixture<ElectronicContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElectronicContractComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectronicContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
