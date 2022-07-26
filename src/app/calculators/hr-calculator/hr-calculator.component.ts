import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/utils/helper.service';

@Component({
  selector: 'app-hr-calculator',
  templateUrl: './hr-calculator.component.html',
  styleUrls: ['./hr-calculator.component.css']
})
export class HrCalculatorComponent implements OnInit {
  selectedMethod = 0;
  age: number;
  showResult = false;
  targetRH = targetMock;

  constructor(public helper: HelperService) { }

  ngOnInit(): void {
  }

  calculateClick() {
    if(this.age < 0 || this.age > 200) {
      return;
    }

    switch (this.selectedMethod) {
      case 0:
        this.calcBasic();
        break;
      case 1:
        this.calcFulano();
        break;
    }
    this.showResult = true;
  }

  calcFulano() {
  }
  
  calcBasic() {
    const mhr = 220 - this.age;
    this.targetRH.forEach(t => {
      t.min_thr = this.helper.roundedToFixed(mhr * t.min_pct_intensity / 100, 0);
      t.max_thr = this.helper.roundedToFixed(mhr * t.max_pct_intensity / 100, 0);
    });
    console.log(this.targetRH)
  }
  
  reset() {
    this.showResult = false;
    this.selectedMethod = 0;
    this.age = 0;
  }
}

export const targetMock = [
  {
    name: 'Very Light',
    description: 'Warm Up Zone',
    min_pct_intensity: 50,
    max_pct_intensity: 60,
    min_thr: 0,
    max_thr: 0
  },
  {
    name: 'Light',
    description: 'Fat Burn Zone',
    min_pct_intensity: 60,
    max_pct_intensity: 70,
    min_thr: 0,
    max_thr: 0
  },
  {
    name: 'Moderate',
    description: 'Aerobic Zone',
    min_pct_intensity: 70,
    max_pct_intensity: 80,
    min_thr: 0,
    max_thr: 0
  },
  {
    name: 'Hard',
    description: 'Anaerobic Zone',
    min_pct_intensity: 80,
    max_pct_intensity: 90,
    min_thr: 0,
    max_thr: 0
  },
  {
    name: 'Maximum',
    description: 'VO2 Max Zone',
    min_pct_intensity: 90,
    max_pct_intensity: 100,
    min_thr: 0,
    max_thr: 0
  }
];