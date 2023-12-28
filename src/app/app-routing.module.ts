import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router'
import { HomeComponent } from './home/home.component';
import { PaceCalculatorComponent } from './calculators/pace-calculator/pace-calculator.component';
import { HrCalculatorComponent } from './calculators/hr-calculator/hr-calculator.component';

const routes: Routes = [
  // { path: '', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'pace-calculator', component: PaceCalculatorComponent },
  { path: 'target-heart-rate-calculator', component: HrCalculatorComponent }
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
