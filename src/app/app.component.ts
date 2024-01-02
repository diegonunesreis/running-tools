import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'running-tools';

  constructor(private translateService: TranslateService) {
    const userLang = navigator.language || 'en';
    // console.log('browser language: ', userLang);
    const languageCode = userLang.split('-')[0];
    this.translateService.setDefaultLang(languageCode);
    this.translateService.use(languageCode);
  }
}
