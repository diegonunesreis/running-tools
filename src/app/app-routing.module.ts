import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router'
import { HomeComponent } from './home/home.component';
import { PaceCalculatorComponent } from './calculators/pace-calculator/pace-calculator.component';
import { HrCalculatorComponent } from './calculators/hr-calculator/hr-calculator.component';
import { BmrCalculatorComponent } from './calculators/bmr-calculator/bmr-calculator.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'pace-calculator', component: PaceCalculatorComponent },
  { path: 'target-heart-rate-calculator', component: HrCalculatorComponent },
  { path: 'bmr-calculator', component: BmrCalculatorComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
