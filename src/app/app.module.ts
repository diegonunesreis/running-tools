import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { PaceCalculatorComponent } from './calculators/pace-calculator/pace-calculator.component';
import { HrCalculatorComponent } from './calculators/hr-calculator/hr-calculator.component';
import { HelperService } from './utils/helper.service';
import { BmrCalculatorComponent } from './calculators/bmr-calculator/bmr-calculator.component';
import { UnderConstructionComponent } from 'src/shared/feedbacks/under-construction/under-construction.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    PaceCalculatorComponent,
    HrCalculatorComponent,
    BmrCalculatorComponent,
    UnderConstructionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    HelperService,
    {
      provide: LOCALE_ID,
      useValue: 'pt-PT',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
