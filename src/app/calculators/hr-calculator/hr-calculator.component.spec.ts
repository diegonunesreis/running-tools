import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrCalculatorComponent } from './hr-calculator.component';

describe('HrCalculatorComponent', () => {
  let component: HrCalculatorComponent;
  let fixture: ComponentFixture<HrCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrCalculatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HrCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
