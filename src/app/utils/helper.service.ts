import { formatNumber } from '@angular/common';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  constructor(private translateService: TranslateService) {}

  roundedToFixed(input: number, digits: number): number {
    var rounded = Math.pow(10, digits);
    return +(Math.round(input * rounded) / rounded).toFixed(digits);
  }

  formatNumberByLanguage(value: number): string {
    const currentLang = this.translateService.currentLang;
    const formattedNumber = formatNumber(value, currentLang, '1.0-0');
    return formattedNumber;
  }
}
