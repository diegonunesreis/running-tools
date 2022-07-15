import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaceCalculatorComponent } from './pace-calculator.component';

describe('PaceCalculatorComponent', () => {
  let component: PaceCalculatorComponent;
  let fixture: ComponentFixture<PaceCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaceCalculatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaceCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
