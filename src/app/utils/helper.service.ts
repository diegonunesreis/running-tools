import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  roundedToFixed(input: number, digits: number): number {
    var rounded = Math.pow(10, digits);
    return +(Math.round(input * rounded) / rounded).toFixed(digits);
  }
}
