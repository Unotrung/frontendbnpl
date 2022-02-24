import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeNidComponent } from './type-nid.component';

describe('TypeNidComponent', () => {
  let component: TypeNidComponent;
  let fixture: ComponentFixture<TypeNidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeNidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeNidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
