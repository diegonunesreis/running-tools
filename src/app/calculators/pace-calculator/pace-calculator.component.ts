import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { HelperService } from 'src/app/utils/helper.service';

@Component({
  selector: 'app-pace-calculator',
  templateUrl: './pace-calculator.component.html',
  styleUrls: ['./pace-calculator.component.css']
})
export class PaceCalculatorComponent implements OnInit {
  DEFAULT_TIME_STRUCT = { hour: 0, minute: 0, second: 0 };
  BOX_SHADOW_STYLE = '0 0 0 0.25rem rgb(253 250 13 / 36%)';

  time: NgbTimeStruct = this.DEFAULT_TIME_STRUCT;
  pace: NgbTimeStruct = this.DEFAULT_TIME_STRUCT;
  distance: number = 0;

  distanceUnit: number = 1;
  paceUnit: number = 1;

  /* lastCalc possible values: time, pace, distance */
  lastCalc: string | undefined;

  constructor(public helper: HelperService) { }

  ngOnInit(): void {
    document.getElementById('pacePicker')?.getElementsByClassName('ngb-tp-hour')[0].remove();
    document.getElementById('pacePicker')?.getElementsByClassName('ngb-tp-spacer')[0].remove();
    this.setOnClickListener();
  }

  setOnClickListener() {
    setTimeout(() => {
      let inputsArr = document.getElementsByTagName('input');
      if (inputsArr && inputsArr.length > 0) {
        for (let i = 0; i < inputsArr.length; i++) {
          let input = inputsArr.item(i);
          if (input) {
            input.onclick = () => {
              input?.select();
            };
          }
        }
      }
    }, 0);
  }

  calculate() {
    let hasTime = false, hasPace = false, hasDistance = false;
    if (JSON.stringify(this.time) !== JSON.stringify(this.DEFAULT_TIME_STRUCT)) hasTime = true;
    if (JSON.stringify(this.pace) !== JSON.stringify(this.DEFAULT_TIME_STRUCT)) hasPace = true;
    if (this.distance && this.distance != 0) hasDistance = true;

    if (hasPace && hasDistance && !hasTime) {
      this.calcTime();
    }
    else if (hasPace && hasTime && !hasDistance) {
      this.calcDistance()
    }
    else if (hasDistance && hasTime && !hasPace) {
      this.calcPace();
    }
    else if (this.lastCalc) {
      this.retryLastCalc();
    }
  }

  retryLastCalc() {
    switch (this.lastCalc) {
      case 'time':
        this.calcTime();
        break;
      case 'pace':
        this.calcPace();
        break;
      case 'distance':
        this.calcDistance();
        break;
    }
  }

  calcTime() {
    const paceSeconds = this.pace.minute * 60 + this.pace.second;
    const totalSeconds = paceSeconds * this.distance * this.distanceUnit / this.paceUnit;

    const hour = Math.floor(totalSeconds / 3600);

    const minute = Math.floor(totalSeconds / 60) - hour * 60;

    const second = this.helper.roundedToFixed(totalSeconds - hour * 3600 - minute * 60, 0);

    this.time = {
      hour: hour,
      minute: minute,
      second: second
    };

    this.lastCalc = 'time';
    this.highlightField('time');
  }

  calcDistance() {
    const paceSeconds = this.pace.minute * 60 + this.pace.second;
    const timeSeconds = this.time.hour * 3600 + this.time.minute * 60 + this.time.second;

    const finalDistance = timeSeconds * 1000 / paceSeconds * this.paceUnit;
    this.distance = this.helper.roundedToFixed(finalDistance / (1000 * this.distanceUnit), 2);

    this.lastCalc = 'distance';
    this.highlightField('distance');
  }

  calcPace() {
    const distanceMeters = this.distance * 1000 * this.distanceUnit;
    const timeSeconds = this.time.hour * 3600 + this.time.minute * 60 + this.time.second;

    const paceSeconds = 1000 * this.paceUnit * timeSeconds / distanceMeters;

    const hour = Math.floor(paceSeconds / 3600);
    const minute = Math.floor(paceSeconds / 60) - hour * 60;
    const second = this.helper.roundedToFixed(paceSeconds - hour * 3600 - minute * 60, 0);

    this.pace = {
      hour: hour,
      minute: minute,
      second: second
    };

    this.lastCalc = 'pace';
    this.highlightField('pace');
  }

  reset() {
    this.time = this.DEFAULT_TIME_STRUCT;
    this.pace = this.DEFAULT_TIME_STRUCT;
    this.distance = 0;
    this.lastCalc = undefined;
  }

  highlightField(field: string) {

    switch (field) {
      case 'time':
        const timePickerInputs = document.getElementById('time-picker')?.getElementsByTagName('input');

        if (timePickerInputs && timePickerInputs.length > 0) {
          this.highlightArray(timePickerInputs)
        }
        break;
      case 'distance':
        const distanceInput = document.getElementById('distanceInput');

        if (distanceInput) {
          this.highlightSingle(distanceInput);
        }
        break;
      case 'pace':
        const paceInputs = document.getElementById('pacePicker')?.getElementsByTagName('input');

        if (paceInputs) {
          this.highlightArray(paceInputs);
        }
        break
    }
  }

  highlightSingle(input: HTMLElement) {
    input.style.boxShadow = this.BOX_SHADOW_STYLE;

    setTimeout(() => {
      input.style.boxShadow = '';
    }, 2000);
  }

  highlightArray(inputs: HTMLCollectionOf<HTMLInputElement>) {
    for (let i = 0; i < inputs.length; i++) {
      let input = inputs.item(i);
      if (input) {
        input.style.boxShadow = this.BOX_SHADOW_STYLE;

        setTimeout(() => {
          if (input) {
            input.style.boxShadow = '';
          }
        }, 2000);
      }
    }
  }

}
