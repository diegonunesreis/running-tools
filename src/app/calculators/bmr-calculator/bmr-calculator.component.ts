import { formatNumber } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HelperService } from 'src/app/utils/helper.service';

@Component({
  selector: 'app-bmr-calculator',
  templateUrl: './bmr-calculator.component.html',
  styleUrls: ['./bmr-calculator.component.css'],
})
export class BmrCalculatorComponent implements OnInit {
  form: FormGroup;
  bmr = 0;
  bmrDisplay: { value: string };
  showResult = false;
  activityLevels = activityLevelsMocks;

  constructor(private helper: HelperService) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      age: new FormControl(null, { validators: [Validators.required, Validators.min(0), Validators.max(200)] }),
      gender: new FormControl(null, { validators: [Validators.required] }),
      height: new FormControl(null, { validators: [Validators.required, Validators.min(1), Validators.max(300)] }),
      weight: new FormControl(null, { validators: [Validators.required, Validators.min(1), Validators.max(800)] }),
    });
  }

  onSubmit(): void {
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key)?.markAsTouched();
    });

    if (this.form.invalid) {
      return;
    }

    this.bmr = 10 * this.weight.value + 6.25 * this.height.value - 5 * this.age.value;
    this.bmr = this.gender.value === 'm' ? this.bmr + 5 : this.bmr - 161;

    this.bmrDisplay = { value: this.helper.formatNumberByLanguage(this.bmr) };
    this.showResult = true;
  }

  onReset(): void {
    this.showResult = false;
  }

  get gender(): FormControl {
    return this.form.get('gender') as FormControl;
  }

  get age(): FormControl {
    return this.form.get('age') as FormControl;
  }

  get height(): FormControl {
    return this.form.get('height') as FormControl;
  }

  get weight(): FormControl {
    return this.form.get('weight') as FormControl;
  }
}

const activityLevelsMocks = [
  {
    description: 'bmrCalc.table.data.sedentary',
    multiplier: 1.2,
  },
  {
    description: 'bmrCalc.table.data.light',
    multiplier: 1.375,
  },
  {
    description: 'bmrCalc.table.data.moderate',
    multiplier: 1.55,
  },
  {
    description: 'bmrCalc.table.data.very',
    multiplier: 1.725,
  },
  {
    description: 'bmrCalc.table.data.extreme',
    multiplier: 1.9,
  },
];
