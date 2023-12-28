import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/utils/helper.service';

@Component({
  selector: 'app-hr-calculator',
  templateUrl: './hr-calculator.component.html',
  styleUrls: ['./hr-calculator.component.css'],
})
export class HrCalculatorComponent implements OnInit {
  MIN_AGE = 0;
  MAX_AGE = 200;
  MIN_HRR = 0;
  MAX_HRR = 200;

  selectedMethod = '0';
  age: number | undefined;
  hrr: number | undefined;
  showResult = false;
  targetRH = targetMock;
  errMsg: string = 'Please, insert a valid age.';

  ageInvalid = false;
  hrrInvalid = false;

  constructor(public helper: HelperService) {}

  ngOnInit(): void {}

  onSelectChange() {
    this.reset();
  }

  calculateClick() {
    this.validateForm();
    switch (this.selectedMethod) {
      case '0':
        this.calcBasic();
        break;
      case '1':
        this.calcKarvonen();
        break;
    }
  }

  calcBasic() {
    if (this.ageInvalid) {
      return;
    }

    const mhr = 220 - this.age!;
    this.targetRH.forEach(t => {
      t.min_thr = this.helper.roundedToFixed((mhr * t.min_pct_intensity) / 100, 0);
      t.max_thr = this.helper.roundedToFixed((mhr * t.max_pct_intensity) / 100, 0);
    });
    this.showResult = true;
  }

  calcKarvonen() {
    if (this.ageInvalid || this.hrrInvalid) {
      return;
    }
    const mhr = 220 - this.age!;
    const rhr = mhr - this.hrr!;
    this.targetRH.forEach(t => {
      t.min_thr = this.helper.roundedToFixed((rhr * t.min_pct_intensity) / 100, 0) + this.hrr!;
      t.max_thr = this.helper.roundedToFixed((rhr * t.max_pct_intensity) / 100, 0) + this.hrr!;
    });
    this.showResult = true;
  }

  validateForm(): void {
    this.validateAge();
    this.validateHrr();
  }

  validateAge(): void {
    this.ageInvalid = !this.age || this.age < this.MIN_AGE || this.age > this.MAX_AGE;
  }

  validateHrr(): void {
    this.hrrInvalid = !this.hrr || this.hrr < this.MIN_HRR || this.hrr > this.MAX_HRR;
  }

  reset() {
    this.targetRH = targetMock;
    this.showResult = false;
    this.age = undefined;
    this.hrr = undefined;
    this.clearValidators();
  }

  clearValidators() {
    this.ageInvalid = false;
    this.hrrInvalid = false;
  }
}

export const targetMock = [
  {
    name: 'Very Light',
    description: 'Warm Up Zone',
    min_pct_intensity: 50,
    max_pct_intensity: 60,
    min_thr: 0,
    max_thr: 0,
  },
  {
    name: 'Light',
    description: 'Fat Burn Zone',
    min_pct_intensity: 60,
    max_pct_intensity: 70,
    min_thr: 0,
    max_thr: 0,
  },
  {
    name: 'Moderate',
    description: 'Aerobic Zone',
    min_pct_intensity: 70,
    max_pct_intensity: 80,
    min_thr: 0,
    max_thr: 0,
  },
  {
    name: 'Hard',
    description: 'Anaerobic Zone',
    min_pct_intensity: 80,
    max_pct_intensity: 90,
    min_thr: 0,
    max_thr: 0,
  },
  {
    name: 'Maximum',
    description: 'VO2 Max Zone',
    min_pct_intensity: 90,
    max_pct_intensity: 100,
    min_thr: 0,
    max_thr: 0,
  },
];
